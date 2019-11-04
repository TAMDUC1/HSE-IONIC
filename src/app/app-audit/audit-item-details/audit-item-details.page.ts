import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController,LoadingController, AlertController } from '@ionic/angular';
import {IAudit} from '../audit';
import {LvModalComponent} from '../audit-detail/lv-modal/lv-modal.component';
import {myEnterAnimation} from '../../animation/enter';
import {myLeaveAnimation} from '../../animation/leave';
import {ApiService} from '../../services/audit/api.service';
//import {async} from 'rxjs/internal/scheduler/async';

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
  private state : string;
  private Object;

  constructor(
      private router: ActivatedRoute,
      private route : Router,
      private navCtrl : NavController,
      private apiCtrl : ApiService,
      private loadingCtrl :LoadingController,
      private alertCtrl : AlertController
  ) { }

  ngOnInit() {
    //this.router.
      if(this.router.snapshot.data['uuid']){
          this.uuid = this.router.snapshot.data['uuid'];
      }

      if(this.router.snapshot.data['audits']){
          this.audits = this.router.snapshot.data['audits'];
      }

      this.router.paramMap.subscribe(paramMap=>{
          if(!paramMap){
              this.navCtrl.navigateBack('tabs/tab1');
          }
          else{
              this.nnName = paramMap.get('nnName');
              console.log('nnName',this.nnName);
              this.lvName = paramMap.get('lvName');
              console.log('lvName',this.lvName);
              this.ndName = paramMap.get('ndName');
              console.log('ndName',this.ndName);
          }
      });
     // this.nnName = this.getData();
     // console.log('nnName',this.nnName);

      if(this.audits){
          this.audits.forEach((e)=>{
              if(e.uuid == this.uuid){// kiem tra dung audit
                  console.log('AUDIT IS :',e);
                  this.singleAudit = e;
                 // console.log('nnName',this.nnName);
                  e.data.checkList.forEach((el)=>{
                      if(el.name == this.nnName){
                          console.log(el.field);
                      }
                  })
              }
          })
      }

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
           console.log('nnName',tempData);
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
  updateProfile(){

      console.log(this.form.value);
  }
// edit here ....

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
        }).then(loadingEl =>{
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
            header: 'Alert',
            subHeader: 'Status',
            message: 'updated confirm!!!',
            buttons: ['OK']
        });

        await alert.present();
    } ;

    onClose(url){

        this.route.navigateByUrl('/'+url+'/'+this.uuid);

    }


}
