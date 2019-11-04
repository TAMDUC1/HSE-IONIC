import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NavController, ModalController} from '@ionic/angular';
import {Audit} from '../model/audit.model';
import {ApiService} from '../../services/audit/api.service';
import { DataService } from '../../services/audit/data.service';
import {Observable} from 'rxjs';
import {RealestateService} from '../../services/realestate.service';
import { LvModalComponent} from './lv-modal/lv-modal.component';
import { myEnterAnimation } from '../../animation/enter';
import { myLeaveAnimation} from '../../animation/leave';

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

    constructor(
      public realestateService: RealestateService,
      private route: ActivatedRoute,
      private navCtrl : NavController,
      private apiService: ApiService,
      private dataService: DataService,
      private router: Router,
      private modalCtrl : ModalController
  ) { }

  ngOnInit() {

      if(this.route.snapshot.data['singleAudit']){

          this.singleAudit = this.route.snapshot.data['singleAudit'];
          console.log('single audit', this.singleAudit);
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
                        console.log(el.children);
                        tempChildren.push(el.children);
                    }
                })
            }

        });
        return Promise.resolve(tempChildren);

    }

   async onOpenModal(nnName,lvName){
       try {
         var tempChildren = await this.getChild(nnName,lvName);
           this.modalCtrl.create({
                component : LvModalComponent,
                enterAnimation: myEnterAnimation,
                leaveAnimation: myLeaveAnimation,
                cssClass: 'from-middle-modal',
                componentProps :{
                    uuid : this.uuid,
                    nnName : nnName,
                    lvName : lvName,
                    ndName :'',
                    content : tempChildren
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
        this.router.navigateByUrl('/'+url+'/'+this.uuid+'/'+nnName+'/'+lvName);
    }
    onClose(url){

        this.router.navigateByUrl('/'+url);

    }

}
