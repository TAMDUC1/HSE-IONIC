import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NavController, ModalController, LoadingController} from '@ionic/angular';
import {Audit} from '../model/audit.model';
import {ApiService} from '../../services/audit/api.service';
import {DataService} from '../../services/audit/data.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
//import { Animation, AnimationController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import {RealestateService} from '../../services/realestate.service';
import {LvModalComponent} from './lv-modal/lv-modal.component';
import {myEnterAnimation} from '../../animation/enter';
import {myLeaveAnimation} from '../../animation/leave';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
    selector: 'app-audit-detail',
    templateUrl: './audit-detail.page.html',
    styleUrls: ['./audit-detail.page.scss'],
})
export class AuditDetailPage implements OnInit {
    Audit = new Audit('', '', '', '', '', 0, 0, 0, 0, 0, new Date(),
        new Date(), '', '');
     checkList: string;
     data = [];
     temp;
     type = 'list';
     uuid: string;
     agents: Observable<any[]>;
     singleAudit;
     files : any;
     auditType ;
     auditUrl = environment.apiAudit;
    requestObject: any = null;
    /*  nnName: string; // nhom nganh
      lvName : string; // noi dung kiem tra
      ndName : string; // shouldbe noidung kiem tra
      ndDescription : string;
      ndState : string;*/
    constructor(
        public realestateService: RealestateService,
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private apiService: ApiService,
        private dataService: DataService,
        private router: Router,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController,
        private HTTP: HTTP,
    ) {
    }


    ionViewWillEnter() {
        this.dataService.getSingleAudit.subscribe((audit) => {
            this.singleAudit = audit;
        });
        this.dataService.File.subscribe((file) => {
            this.files = file;
        });
    }

    ionViewDidEnter() {

    }

    ngOnInit() {
        // subscribe to get the lastest single audit
        this.dataService.getSingleAudit.subscribe((audit) => {
            if(audit){
                console.log('audit123', audit);

                this.singleAudit = audit;


            }
        });

        /*if(this.route.snapshot.data['singleAudit']){

          //  this.singleAudit = this.route.snapshot.data['singleAudit'];
        //    console.log('single audit', this.singleAudit);
        }*/
        this.dataService.File.subscribe((file) => {
            //  console.log('file123',file);
            this.files = file;
            console.log('file from observer', file);
        });
        if (this.route.snapshot.data['files']) {
            //  this.files = this.route.snapshot.data['files'];
            //console.log('files  get from resolve', this.files);
        }
        if (this.route.snapshot.data['audits']) {
            this.data = this.route.snapshot.data['audits'];
        }
        this.agents = this.realestateService.getTopAgent(2);

        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap) {
                this.navCtrl.navigateBack('tabs/tab1');
            } else {
                this.uuid = paramMap.get('uuid');
                this.dataService.setUuid(this.uuid);
                console.log('uuid in detail page', this.uuid);
                console.log('this.singleAudit.uuid ', this.singleAudit.uuid );
               /* if(this.singleAudit.uuid == this.uuid){
                    this.temp = this.singleAudit.data;
                    console.log('this temp', this.temp);
                }*/

                this.data.forEach((e) => {
                    if (e.uuid == paramMap.get('uuid')) {
                        if(e.kind == 1){
                            this.auditType = 1;
                            this.temp = e.data;
                            this.temp.checkList = this.temp.checkList.filter(function(e){
                                console.log(e);
                                return e.type !='Lĩnh vực rủi ro';
                            });
                           // console.log('checkList',this.temp.checkList);
                            this.temp.checkList.forEach(f =>{
                                f["show"] = false;
                            });
                            console.log('checkList',this.temp.checkList);
                        }
                        else{
                            this.auditType = 2;
                        }
                    }
                });


            }

        });
    }


    getChild(nnName, lvName) {
        var tempChildren = {};
        this.temp.checkList.forEach((e) => {
            if (e.title.vi == nnName) {
                e.children.forEach(el => {
                    console.log('el',el);
                    if (el.title.vi == lvName) {
                        el.children = el.children.map(elChild => ({...elChild, ...{expanded: false}}));
                        tempChildren =el;
                    }
                });
            }
        });
        return Promise.resolve(tempChildren);
    }

    async onOpenModal(nnName, lvName) {
        console.log('this.file 2020',this.files);
        var tempFiles = this.files.filter(e => e.typeProblem === lvName);
        console.log('tempFiles',tempFiles);
        var fileString = environment.coreFileUpload.concat(this.uuid);
        this.HTTP.get(fileString, {}, {
            'Content-Type': 'application/json'
        }).then(res => {
                res.data = JSON.parse(res.data);
                console.log('file data', res.data, 'uuid', this.uuid);
            }
        );
        try {
            var tempChildren = await this.getChild(nnName, lvName);
            this.dataService.setObj(nnName, lvName);// save nn va lv
            this.modalCtrl.create({
                component: LvModalComponent,
                backdropDismiss: false,
                componentProps: {
                    uuid: this.uuid,
                    nnName: nnName,
                    lvName: lvName,
                    ndName: '',
                    content: tempChildren,
                    files: tempFiles
                }

            }).then(modalEl => {

                modalEl.present();
                return modalEl.onDidDismiss();
            }).then(resultData =>{
                console.log(resultData.data, resultData.role);
                if(resultData.role ==='save'){
                    this.temp.checkList.forEach(e =>{
                        if(e.title.vi === resultData.data.lv){
                            e.children.forEach(el =>{
                                if(el.title.vi === resultData.data.title){
                                    el.description = resultData.data.desciption;
                                    el.state = resultData.data.state;
                                }
                            })
                        }
                    })
                }
            })
        } catch (err) {
            console.log('Error: ', err.message);
        }

    }
    openItemDetail(url, nnName, lvName) {
        this.router.navigateByUrl('/' + url + '/' + this.uuid + '/' + nnName + '/' + lvName);
    }

    onClose(url) {
        this.router.navigateByUrl('/' + url);
    }
    onShow(c){
        c.show = !c.show;
        console.log(c);
    }
    isGroupShown(c){
        return c.show;
    }

}
