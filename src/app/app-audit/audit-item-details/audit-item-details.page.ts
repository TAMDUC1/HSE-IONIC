import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController, LoadingController, AlertController, ModalController} from '@ionic/angular';
import {IAudit} from '../audit';
import {DataService} from '../../services/audit/data.service';
import {myEnterAnimation} from '../../animation/enter';
import {myLeaveAnimation} from '../../animation/leave';
import {ApiService} from '../../services/audit/api.service';
import {AuditItemEvaluateComponent} from './audit-item-evaluate/audit-item-evaluate.component';
//import { HTTP } from '@ionic-native/http/ngx';
import {json} from '@angular-devkit/core';

@Component({
  selector: 'app-audit-item-details',
  templateUrl: './audit-item-details.page.html',
  styleUrls: ['./audit-item-details.page.scss'],
})
export class AuditItemDetailsPage implements OnInit
{
  form : FormGroup;
  audits :IAudit[];
  singleAudit : IAudit;
  item : string;
  uuid : string;
  nnName: string; // nhom nganh
  lvName : string; // noi dung kiem tra
  ndName : string; // shouldbe noidung kiem tra
  ndDescription : string;
  ndState : string;
  private files : [];
  private state : string;
  private ObjNnLv;

  constructor(
      private router: ActivatedRoute,
      private route : Router,
      private navCtrl : NavController,
      private apiCtrl : ApiService,
      private loadingCtrl :LoadingController,
      private alertCtrl : AlertController,
      //private HTTP :HTTP,
      private dataService : DataService,
      private modalCtrl : ModalController

  ) { }

  ngOnInit() {
    //this.router.
      if(this.router.snapshot.data['nnLv']){
          this.ObjNnLv = this.router.snapshot.data['nnLv'];
          console.log('nn lv ... iss ',this.ObjNnLv);
          this.nnName = this.ObjNnLv.nnName;
          this.lvName = this.ObjNnLv.lvName;
         // this.uuid = this.router.snapshot.data['uuid'];
      }
      if(this.router.snapshot.data['nd']){
          this.ndName = this.router.snapshot.data['nd'];
      }
      if(this.router.snapshot.data['uuid']){
          this.uuid = this.router.snapshot.data['uuid'];
      }
      /*if(this.router.snapshot.data['uuid']){
          this.uuid = this.router.snapshot.data['uuid'];
      }*/
      if(this.router.snapshot.data['audits']){
          this.audits = this.router.snapshot.data['audits'];
         // this.getData();
      }

      this.router.paramMap.subscribe(paramMap=>{
          if(!paramMap){
              this.navCtrl.navigateBack('tabs/tab1');
          }
          else{
          }
      });

      if(this.router.snapshot.data['singleAudit']){
          this.singleAudit = this.router.snapshot.data['singleAudit'];
          console.log('single audit kkkk', this.singleAudit);
          this.singleAudit.data.checkList.forEach(e =>{

              if(e.name == this.nnName){
                  console.log('e name',e.name);
                  e.field.forEach((el)=>{
                      console.log('el name', el.name);
                      if(el.name==this.lvName){           // linh vuc
                          el.children.forEach((nd)=>{
                              if(nd.name == this.ndName){          // noi dung kiem tra
                                  this.ndDescription = nd.description;
                                  console.log('description ....',this.ndDescription);
                                  this.ndState =  nd.state;
                                  console.log('state ....',this.ndState);
                              }
                          })
                      }
                  })

              }
          })
      }
      /*this.HTTP.get('http://222.255.252.41/api/CoreFileUploads/b7f448dc-1451-477a-87f9-9214d1621c20',{},{
          'Content-Type' : 'application/json'
      }).then(res=> {
          res.data = JSON.parse(res.data);
          res.data.forEach(e => {
              e.data = JSON.parse(e.data);
              console.log('path idag ...',e.data.path);
          });
      }
      );*/

     // this.nnName = this.getData();
     // console.log('nnName',this.nnName);

      /*if(this.audits){
          this.audits.forEach((e)=>{
              if(e.uuid == this.uuid){// kiem tra dung audit
                  console.log('AUDIT IS :',e);
                  this.singleAudit = e;
                 // console.log('nnName',this.nnName);
                  e.data.checkList.forEach((el)=>{
                      if(el.name == this.nnName){
                          console.log('el.field',el.field);
                      }

                      el.field.forEach((el)=>{
                          if(el.name==this.lvName){           // linh vuc
                              el.children.forEach((nd)=>{
                                  if(nd.name == this.ndName){          // noi dung kiem tra
                                     this.ndDescription = nd.description;
                                     console.log('description ....',this.ndDescription);
                                    this.ndState =  nd.state;
                                      console.log('state ....',this.ndState);

                                  }
                              })
                          }
                      })


                  })
              }
          })
      }*/

      this.form = new FormGroup({
      description : new FormControl('',{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      evaluate : new FormControl('',{
          updateOn:'blur'
      }),
    });
  }

   async getData(){
      var tempData;
       try {
           tempData = await this.getnnName();
           console.log('nnName async',tempData);
           return tempData;

       }
       catch(err) {
           console.log('Error: ', err.message);
       }
   }
   getnnName(){
        var nnName = '';
       if(this.audits){
           this.audits.forEach((e)=>{
               if(e.uuid == this.uuid){// kiem tra dung audit
                   console.log(e.data);
                  // console.log('nnName',this.nnName);
                   e.data.checkList.forEach((el)=>{
                       if(el.name == this.nnName){
                           nnName = el.name;
                           console.log(el.field);
                       }
                   })
               }
           })
       }
       return Promise.resolve(nnName);
  }

    onEditToBackend()
    {
      /*  this.singleAudit.data.checkList.forEach((e)=>{
            if(e.name === this.nnName){                // nhom nganh
                e.field.forEach((el)=>{
                    if(el.name==this.lvName){           // linh vuc
                        el.children.forEach((nd)=>{
                            if(nd.name == this.ndName){          // noi dung kiem tra
                                nd.description = this.form.value.description ;
                                nd.state = this.form.value.evaluate ;
                            }
                        })
                    }
                })
            }
        });

        this.singleAudit.data = JSON.stringify(this.singleAudit.data);
        this.apiCtrl.updateAuditSingle(this.singleAudit,this.uuid).subscribe((rest)=>{
            console.log('databack',rest);
        });*/

        this.loadingCtrl.create({
            keyboardClose :true,
            message: 'waiting ...'
        }).then(loadingEl =>

        {
            loadingEl.present();
            this.apiCtrl.getAuditSingle(this.uuid).subscribe((res)=>
            {

                res.data = JSON.parse(res.data);
                res.data.checkList.forEach((e)=>{
                    if(e.name === this.nnName){                // nhom nganh
                        e.field.forEach((el)=>{
                            if(el.name==this.lvName){           // linh vuc
                                el.children.forEach((nd)=>{
                                    if(nd.name == this.ndName){          // noi dung kiem tra
                                        nd.description = this.form.value.description ;
                                        nd.state = this.form.value.evaluate ;
                                    }
                                })
                            }
                        })
                    }
                }) ;
                res.data = JSON.stringify(res.data);
                this.apiCtrl.updateAuditSingle(res,this.uuid).subscribe((response)=>{
                    if(response.status == 204){

                        setTimeout(()=>{
                        loadingEl.dismiss();
                        this.presentAlert();
                        },1000);

                    }
                    else{
                        this.presentAlertFail();

                        loadingEl.dismiss();

                    }
                });

            });
        });

    }
    onUploadFiles(){
      console.log('upload File')
    }
    async presentAlertFail() {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
            subHeader: 'Status',
            message: 'updated failed!!!',
            buttons: ['OK']
        });

        await alert.present();
    } ;
    async presentAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Thông báo',
            subHeader: '',
            message: 'update thành công !!!',
            buttons: ['OK']
        });

        await alert.present();
    } ;
    onEvaluate(){
        this.modalCtrl.create({
            component: AuditItemEvaluateComponent,
            enterAnimation: myEnterAnimation,
            leaveAnimation: myLeaveAnimation,
            //cssClass: 'from-middle-modal',
            componentProps :{
                uuid : this.uuid,
                nnName : this.nnName,
                lvName : this.lvName,
                ndName : this.ndName

            }
        }).then(modalEl =>{
            modalEl.present();
            return modalEl.onDidDismiss();
        }).then(resultData =>{
            if(resultData.role === 'save'){
                this.ndDescription = resultData.data.ndDescription;
                this.ndState = resultData.data.ndState;
            }
        })

    }
   /* onTakePhoto()
    {
        this.loadingCtrl.create({
            keyboardClose :true,
            message: 'waiting ...'
        }).then(loadingEl =>
        {
            loadingEl.present();
            return this.HTTP.get('http://222.255.252.41/api/CoreFileUploads/b7f448dc-1451-477a-87f9-9214d1621c20',{},{
                'Content-Type' : 'application/json'
            })
                .then(res =>
                {

                    console.log('test item ',res.data);

                })
                .catch(err => console.log('err',err));
        });
    }*/

    /* onClose(url){

         this.route.navigateByUrl('/'+url+'/'+this.uuid);

     }*/


}
