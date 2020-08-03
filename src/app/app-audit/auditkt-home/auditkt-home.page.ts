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
import {HttpClient} from '@angular/common/http';
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
  selector: 'app-auditkt-home',
  templateUrl: './auditkt-home.page.html',
  styleUrls: ['./auditkt-home.page.scss'],
})
export class AuditktHomePage implements OnInit {

    private auditUrl: string = 'https://localhost:5001/api/HseAudits/';
    requestObject: any = null;
    public http;
    public audits;
    public audit: IAudit;
    public CompArrs = [];
    public CompArrskt = [];

    page = 0;
    public dummy = {};
    filteredCompArrs = [];
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
        this.filteredCompArrs = this.CompArrskt;
        for (var _i = this.currentDate - 1; _i < this.currentDate + 1; _i++) {
            this.filterDate.push(_i);
        }

    }

    onFilter(searchString: string) {
        return this.CompArrs.filter(audit =>
            audit.data.comp.title.vi.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
    }




    getHTTP() {

        this.CompArrskt = this.dataService.getData(3);
        /* const AuditsObservable = new Observable( observer =>{
             observer.next(this.CompArrs);
         });
         return AuditsObservable;*/
        /* return this.httpClient
             .get<[Audit]>('http://222.255.252.41/api/HseAudits')
             .pipe(
              tap(resData =>{
                  console.log('test ...',resData);
                 /!* const Audits = [];
                  for (const e in resData){
                      console.log(e);
                  }*!/
              })
          );*/

    }

    getHTTP3() {
        this.httpClient.get<[Audit]>('http://222.255.252.41/api/HseAudits').subscribe(res => {
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

    /* getHTTP2(refresh = false, refresher?){
         this.HTTP.get('http://222.255.252.41/api/HseAudits',{},{
             'Content-Type' : 'application/json'
         }).then(res => {
             console.log('ressssss',res);
             this.requestObject = JSON.parse(res.data);
             this.requestObject.forEach((e)=>
             {
                 //  console.log(e.uuid);
                 // this.audit = e;
                 e.data = JSON.parse(e.data);
                 if(e.kind == 1){
                     this.CompArrs.push(e);
                 }
                 if(refresher){
                     refresher.target.complete();
                 }

             });
             this.audits = this.requestObject;
             this.dataService.setData(1,this.audits);// save audits


         }
         )
         .catch(err => this.requestObject = err)
         ;
     }*/
    toggleSideMenu() {
        this.ionicComponentService.sideMenu();
        // this.test.getapiServiceHse();
        //this.menuCtrl.toggle(); //Add this method to your button click function
    }

    openDetail(url, uuid) {
        console.log('nice', uuid);
        var string = 'http://222.255.252.41/api/HseAudits/'.concat(uuid);
        this.HTTP.get(string, {}, {
            'Content-Type': 'application/json'
        }).then(res => {
            res.data = JSON.parse(res.data);
            res.data.data = JSON.parse(res.data.data);
            this.dataService.setData(2, res.data);
            this.dataService.setSingleAudit(res.data);

        });
        // luu file vao service
        //http://222.255.252.41/api/CoreFileUploads
        var fileString = 'http://222.255.252.41/api/CoreFileUploads/'.concat(uuid);
        this.HTTP.get(fileString, {}, {
            'Content-Type': 'application/json'
        })
            .then(res => {
                    var a = res.data;
                    a = JSON.parse(a);
                    /*res.data.forEach( e =>{
                        JSON.parse(e);
                    });*/
                    this.dataService.setFiles(uuid, a);
                    // set file observer
                    console.log('list file a', a);
                    this.dataService.setFile(uuid, a);
                    var imgUrl = 'http://222.255.252.41/uploads/';
                    console.log('aaa',a);
                    var fileArrs = [];
                    a.forEach((e)=>{
                        var data = JSON.parse(e.data);
                        var path = imgUrl.concat(data.path);
                        path = path.concat('/');

                        var file = {
                            uuid : e.modelUuid,
                            name : data.name,
                            path : path.concat(data.name),
                            typeProblem : data.typeProblem
                        } ;
                        console.log('file',file);
                        fileArrs.push(file);
                    });
                    console.log('fileArrays',fileArrs);
                    this.dataService.setFile(uuid, fileArrs);

                    /*  this.files.data.forEach(e=>{
                          var a = JSON.parse(e.data);
                          var path = imgUrl.concat(a.path);
                          path = path.concat('/');
                          var file = {
                              uuid : e.uuid,
                              name : a.name,
                              path : path.concat(a.name),
                              typeProblem : a.typeProblem
                          } ;
                          //Str(e.data);
                          this.filesArr.push(file);
                          console.log('array file',this.filesArr);

                      });*/




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
    onSearch() {

    }

    /* loadData(refresh = false, refresher?)
     {
         this.apiService.getAllAudits().subscribe((res: IAudit[]) => {
             console.log('data',res);
             var temp =[];
             res.forEach((e)=>{
                 //  console.log(e.uuid);
                // this.audit = e;
                 e.data = JSON.parse(e.data);
                 if(e.kind == 1){
                     temp.push(e);
                     this.CompArrs.push(e);
                 }

             });

             // console.log('temp',temp);
             this.audits = res;
             this.dataService.setData(1,this.audits);

             // console.log('data2',this.audits);

             if(refresher){
                 refresher.target.complete();
             }
         })
        /!* this.apiService.getAllDummy().subscribe((res)=>{
             console.log('dummy',res);
             this.dummy = res[0];
         })*!/
     }*/



}
