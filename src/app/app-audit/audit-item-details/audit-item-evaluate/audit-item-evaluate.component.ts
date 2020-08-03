import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/audit/data.service';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
  selector: 'app-audit-item-evaluate',
  templateUrl: './audit-item-evaluate.component.html',
  styleUrls: ['./audit-item-evaluate.component.scss'],
})

export class AuditItemEvaluateComponent implements OnInit {
    form : FormGroup;
//http://222.255.252.41/api/CoreFileUploads/b7f448dc-1451-477a-87f9-9214d1621c20
    private auditUrl = 'http://222.255.252.41/api/HseAudits/';
    uuid;
    nnName;
    lvName;
    ndName;
    ndDescription : string;
    ndState : string;
    requestObject : any = null;

    constructor(
        private modalCtrl : ModalController,
        private dataService: DataService,
        private router: Router,
        private loadingCtrl :LoadingController,
        private HTTP :HTTP,
        private alertCtrl : AlertController,

    ) { }

  ngOnInit() {
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
    onCancel(){
        this.modalCtrl.dismiss(null,'cancel');

    }
    onSubmit(){
        this.modalCtrl.dismiss({ndDescription:this.form.value.description,
            ndState: this.form.value.evaluate},'save');
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
    onEditToBackendNative(){
        this.loadingCtrl.create({
            keyboardClose :true,
            message: 'waiting ...'
        }).then(loadingEl =>
        {
            loadingEl.present();
            var auditSingleUrl = this.auditUrl.concat(this.uuid);
            return this.HTTP.get(auditSingleUrl,{},{
                'Content-Type' : 'application/json'
            })
                .then(res =>
                {
                    this.requestObject = JSON.parse(res.data);
                    this.requestObject.data = JSON.parse(this.requestObject.data);
                    this.requestObject.data.checkList.forEach((e)=>{
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
                    this.requestObject.data = JSON.stringify(this.requestObject.data);
                    // this.requestObject = JSON.stringify(this.requestObject);
                    this.HTTP.setDataSerializer('json');
                    console.log('test object put :',this.requestObject);
                    this.HTTP.put(auditSingleUrl,
                        this.requestObject,
                        {"Content-Type": "application/json"})
                        .then(data => {
                             //   console.log('day la data ',data);
                                if(data.status == 200){
                                    this.ndDescription = this.form.value.description;
                                    this.requestObject.data = JSON.parse(this.requestObject.data);
                                    this.dataService.setData(2,this.requestObject);
                                    console.log('test save data lai.....',this.dataService.getData(2).data.checkList);

                                    setTimeout(()=>{
                                        loadingEl.dismiss();
                                        this.presentAlert();
                                        this.onSubmit();
                                    },1000);
                                }
                                else{
                                    this.presentAlertFail();
                                    loadingEl.dismiss();
                                }
                            }
                        )
                        .catch(err => console.log('day la loi',err));
                })
                .catch(err => this.requestObject = err);
        });

    }
}
