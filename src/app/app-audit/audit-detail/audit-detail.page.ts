import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NavController, ModalController} from '@ionic/angular';
import {Audit} from '../model/audit.model';
import {ApiService} from '../../services/audit/api.service';
import { DataService } from '../../services/audit/data.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {RealestateService} from '../../services/realestate.service';
import { LvModalComponent} from './lv-modal/lv-modal.component';
import { myEnterAnimation } from '../../animation/enter';
import { myLeaveAnimation} from '../../animation/leave';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
  selector: 'app-audit-detail',
  templateUrl: './audit-detail.page.html',
  styleUrls: ['./audit-detail.page.scss'],
})
export class AuditDetailPage implements OnInit {
    Audit = new Audit('','','' ,'','',0,0,0,0,0,new Date(),
        new Date(),'','');
    private  checkList : string;
    private data = [];
    private temp;
    private tempArr = [];
    private uuid:string;
    agents: Observable<any[]>;
    private singleAudit;
    private files = {};

  /*  nnName: string; // nhom nganh
    lvName : string; // noi dung kiem tra
    ndName : string; // shouldbe noidung kiem tra
    ndDescription : string;
    ndState : string;*/
    constructor(
      public realestateService: RealestateService,
      private route: ActivatedRoute,
      private navCtrl : NavController,
      private apiService: ApiService,
      private dataService: DataService,
      private router: Router,
      private modalCtrl : ModalController,

    ) { }

  ngOnInit() {
     /* if(this.route.snapshot.data['singleAudit']){
          this.singleAudit = this.route.snapshot.data['singleAudit'];
          this.singleAudit.data.checkList.forEach(e =>{
              if(e.name == this.nnName){
                  e.field.forEach((el)=>{
                      if(el.name==this.lvName){           // linh vuc
                          el.children.forEach((nd)=>{
                              if(nd.name == this.ndName){          // noi dung kiem tra
                                  this.ndDescription = nd.description;
                                  this.ndState =  nd.state;
                              }
                          })
                      }
                  })

              }
          })
      }*/
      if(this.route.snapshot.data['singleAudit']){

          this.singleAudit = this.route.snapshot.data['singleAudit'];
      //    console.log('single audit', this.singleAudit);
      }
      if(this.route.snapshot.data['files']){
          this.files = this.route.snapshot.data['files'];
          console.log('files  get from resolve', this.files);
      }
      if(this.route.snapshot.data['audits']){
            this.data = this.route.snapshot.data['audits'];
          //  console.log('this data newww', this.data);
      }
      this.agents =  this.realestateService.getTopAgent(2);

      this.route.paramMap.subscribe(paramMap=>{
        if(!paramMap){
            this.navCtrl.navigateBack('tabs/tab1');
        }
        else{
            this.uuid = paramMap.get('uuid');
            this.dataService.setUuid(this.uuid);
            console.log('uuid in detail page',this.uuid);
/*
            this.temp = this.data;
*/
            this.data.forEach((e)=>{
                if(e.uuid == paramMap.get('uuid')){
                    this.temp = e.data;
                    this.temp.checkList.forEach((f)=>
                    {
                        f.field.forEach((g)=>{
                            g.children.forEach((h)=>{
                                if(h.checked){
                                    g.checked = true;
                                }
                            })
                        })
                    })
                }
            });
        }

    })
  }

    getChild(nnName,lvName){
        var tempChildren = [];
        this.temp.checkList.forEach((e)=>{
            if(e.name == nnName){
                e.field.forEach((el)=>{
                    if(el.name == lvName){
                        el.children = el.children.map(elChild =>({...elChild,...{expanded:false}}));
                        tempChildren.push(el.children);
                    }
                })
            }
        });
        console.log('new expanded child   ',tempChildren);
        return Promise.resolve(tempChildren);
    }

   async onOpenModal(nnName,lvName){
       try {
         var tempChildren = await this.getChild(nnName,lvName);
           this.dataService.setObj(nnName,lvName);// save nn va lv
           this.modalCtrl.create({
                component : LvModalComponent,
                backdropDismiss: false,
               /* enterAnimation: myEnterAnimation,
                leaveAnimation: myLeaveAnimation,*/
               // cssClass: 'from-middle-modal',
                componentProps :{
                    uuid : this.uuid,
                    nnName : nnName,
                    lvName : lvName,
                    ndName :'',
                    content : tempChildren,
                    files : this.files
                }
            }).then(modalEl =>{
                modalEl.present();
            })

       }
       catch(err) {
           console.log('Error: ', err.message);
       }


    }
    openItemDetail(url,nnName,lvName){
        //
        this.router.navigateByUrl('/'+url+'/'+this.uuid+'/'+nnName+'/'+lvName);
    }
    onClose(url){

        this.router.navigateByUrl('/'+url);

    }

}
