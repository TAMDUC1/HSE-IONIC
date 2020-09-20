import {Component, OnInit} from '@angular/core';
import {IAudit} from '../audit';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ModalController, NavController, PopoverController} from '@ionic/angular';
import {IonicComponentService} from '../../services/ionic-component.service';
import {ApiService} from '../../services/audit/api.service';
import {NetworkService} from '../../services/network.service';
import {DataService} from '../../services/audit/data.service';
import {HTTP} from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import {LvModalComponent} from '../audit-detail/lv-modal/lv-modal.component';
import {AuditHomeFilterComponent} from './audit-home-filter/audit-home-filter.component';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

interface Audit {
    attachment: string,
    companyId: number,
    createdBy: number,
    createdOn: string,
    data: string,
    dataArr: string,
    kind: number,
    quarter: number,
    status: number,
    updatedBy: number,
    updatedOn: string,
    uuid: string,
    workflow: string,
    year: number
}

@Component({
    selector: 'app-audit-home',
    templateUrl: './audit-home.page.html',
    styleUrls: ['./audit-home.page.scss'],
})
export class AuditHomePage implements OnInit {
    private auditUrl: string = 'https://localhost:5001/api/HseAudits/';
    requestObject: any = null;
    public http;
    public audits;
    public audit: IAudit;
    public CompArrs = [];
    public CompArrsKt = [];
    page = 0;
    public dummy = {};
    filteredCompArrs = [];
    filteredCompArrs2 = [];

    public currentDate = new Date().getFullYear();
    filterDate = [];

    private _searchTerm: string;
    get searchTerm(): string {
        return this._searchTerm;
    }

    set searchTerm(value: string) {
        this._searchTerm = value;
        this.filteredCompArrs = this.onFilter(value);
    }

    constructor(
        private storage: Storage,
        private popCtrl: PopoverController,
        private activatedRoute: ActivatedRoute,
        private navController: NavController,
        public router: Router,
        private modalController: ModalController,
        private ionicComponentService: IonicComponentService,
        private apiService: ApiService,
        private dataService: DataService,
        private HTTP: HTTP,
        private httpClient: HttpClient,
        private modalCtrl: ModalController   ,
        private alertController: AlertController
    ) {
    }

    ngOnInit() {
        //  this.loadData(true);
        this.getHTTP();
       // this.filteredCompArrs = this.CompArrs;

        for (var _i = this.currentDate - 1; _i < this.currentDate + 1; _i++) {
            this.filterDate.push(_i);
        }

    }

    onFilter(searchString: string) {
        return this.CompArrs.filter(audit =>
            audit.data.comp.title.vi.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
    }


     async  onOpenModal() {
        try {
            // this.dataService.setObj(nnName,lvName);// save nn va lv
            this.modalCtrl.create({
                component: AuditHomeFilterComponent,
                backdropDismiss: false,
                /* enterAnimation: myEnterAnimation,
                 leaveAnimation: myLeaveAnimation,*/
                // cssClass: 'from-top-modal-filter',
                componentProps: {
                    filterDate: this.filterDate

                }
            }).then(modalEl => {
                modalEl.present();
                return modalEl.onDidDismiss();
            }).then(resultData =>{
                if(resultData.role ==='save'){
                    console.log(resultData);
                    console.log('this.filteredCompArrs2',this.filteredCompArrs2);

                    var temp = this.filteredCompArrs2;
                    if(resultData.data.status != 0 && resultData.data.year !=='all'){
                        this.filteredCompArrs = temp.filter( function (a){
                            return a.year == resultData.data.year  && a.data.currentStatusId == resultData.data.status;
                        })
                    }
                    else if(resultData.data.status == 0 && resultData.data.year !=='all'){
                        this.filteredCompArrs = temp.filter( function (a){
                            return a.year == resultData.data.year ;
                        })
                    }
                    else if(resultData.data.year =='all' && resultData.data.status != 0){
                        this.filteredCompArrs = temp.filter( function (a){
                            return a.data.currentStatusId == resultData.data.status;
                        })
                    }
                    else{
                        this.filteredCompArrs = temp;
                    }
                    if(this.filteredCompArrs.length <= 0){
                        this.presentAlert();
                    }
                }
            });
        } catch (err) {
            console.log('Error: ', err.message);
        }
    }
    async presentAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'Không tìm thấy kết quả !!!',
            buttons: [
                {
                    text: 'Hiện danh sách mặc định',
                    handler: () => {
                        this.filteredCompArrs = this.filteredCompArrs2;
                    }
                }
            ]
        });

        await alert.present();
    }
    getHTTP() {
        this.httpClient.get<[Audit]>( environment.apiAudit).subscribe(res => {
            res.forEach(e => {
                if (e.kind == 1) {
                    var temp = e;
                    temp.data = JSON.parse(e.data);
                    this.CompArrs.push(temp);
                }
                if (e.kind == 2) {
                    var temp = e;
                    temp.data = JSON.parse(e.data);
                    this.CompArrsKt.push(temp);
                }
            });
            // this.audits = this.CompArrs;
            this.dataService.setData(1, this.CompArrs);// save audits
            this.CompArrs.forEach(e => {
                this.dataService.setData(1, this.CompArrs);
            });
           // this.CompArrs = this.CompArrs.filter(e => e.data.checkList.length >0);
            this.dataService.setData(3, this.CompArrsKt);// save audits

            console.log('this compArrs', this.CompArrs);
            if(this.CompArrs.length){
                var filterComps = this.CompArrs.filter(function (e) {
                    return e.data.checkList.length > 0;
                });
                this.CompArrs = filterComps;
                this.filteredCompArrs = this.CompArrs.sort(function (a,b) {
                    return parseInt(a.data.dotKT)-parseInt(b.data.dotKT);
                });

                this.filteredCompArrs.reverse();
                this.filteredCompArrs2 = this.filteredCompArrs.reverse();

            }

        });


    }

    getHTTP3() {
        this.httpClient.get<[Audit]>( environment.apiAudit).subscribe(res => {
            res.forEach(e => {
                if (e.kind == 1) {
                    var temp = e;
                    temp.data = JSON.parse(e.data);
                    this.CompArrs.push(temp);
                }
            });
            // this.audits = this.CompArrs;
            this.dataService.setData(1, this.CompArrs);// save audits
        });
    }


    toggleSideMenu() {
        this.ionicComponentService.sideMenu();
        // this.test.getapiServiceHse();
        //this.menuCtrl.toggle(); //Add this method to your button click function
    }

    openDetail(url, uuid) {
        console.log('nice', uuid);
        var string = environment.apiAudit.concat(uuid);
        this.HTTP.get(string, {}, {
            'Content-Type': 'application/json'
        }).then(res => {
            res.data = JSON.parse(res.data);
            res.data.data = JSON.parse(res.data.data);
            this.dataService.setData(2, res.data);
            this.dataService.setSingleAudit(res.data);

        });
        // luu file vao service
        var fileString = environment.coreFileUpload.concat(uuid);
        this.HTTP.get(fileString, {}, {
            'Content-Type': 'application/json'
        })
            .then(res => {
                    var a = res.data;
                    a = JSON.parse(a);
                    this.dataService.setFiles(uuid, a);
                    this.dataService.setFile(uuid, a);
                    var imgUrl = environment.upload;
                    var fileArrs = [];
                    a.forEach((e)=>{
                        var data = JSON.parse(e.data);
                        var path = imgUrl.concat(data.path);
                        path = path.concat('/');
                        var file = {
                            uuid : e.modelUuid,
                            uuid_img : e.uuid,
                            name : data.name,
                            path : path.concat(data.name),
                            typeProblem : data.typeProblem
                        } ;
                        fileArrs.push(file);
                    });
                    this.dataService.setFile(uuid, fileArrs);

                }
            );
        this.router.navigateByUrl('/' + url + '/' + uuid);
    }
    checkToken(){
        this.storage.get('access_token').then((val) => {
            let alert = this.alertController.create({
                message: val,
            });
            alert.then(alert => alert.present());
        });

    }

}
