import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/audit/data.service';
import {HTTP} from '@ionic-native/http/ngx';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-audit-item-evaluate',
    templateUrl: './audit-item-evaluate.component.html',
    styleUrls: ['./audit-item-evaluate.component.scss'],
})
export class AuditItemEvaluateComponent implements OnInit {
    form: FormGroup;
    uuid;
    nnName;
    lvName;
    ndName;
    lastDescription;
    lastEvaluate;
    ndDescription: string;
    ndState: string;
    requestObject: any = null;
//http://222.255.252.41/api/CoreFileUploads/b7f448dc-1451-477a-87f9-9214d1621c20
    private auditUrl = 'http://222.255.252.41/api/HseAudits/';

    constructor(private modalCtrl: ModalController,
                private dataService: DataService,
                private router: Router,
                private loadingCtrl: LoadingController,
                private HTTP: HTTP,
                private alertCtrl: AlertController,
    ) {
    }

    onCancel() {
        this.modalCtrl.dismiss(null, 'cancel');

    }

    onEditToBackendNative() {
        this.loadingCtrl.create({
            keyboardClose: true,
            message: 'waiting ...'
        }).then(loadingEl => {
            loadingEl.present();
            var auditSingleUrl = this.auditUrl.concat(this.uuid);
            return this.HTTP.get(auditSingleUrl, {}, {
                'Content-Type': 'application/json'
            })
                .then(res => {
                    this.requestObject = JSON.parse(res.data);
                    this.requestObject.data = JSON.parse(this.requestObject.data);
                    this.requestObject.data.checkList.forEach((e) => {
                        if (e.name === this.nnName) {                // nhom nganh
                            e.field.forEach((el) => {
                                if (el.name == this.lvName) {           // linh vuc
                                    el.children.forEach((nd) => {
                                        if (nd.name == this.ndName) {          // noi dung kiem tra

                                            if (this.form.value.description === "") {
                                                nd.description = this.lastDescription;
                                            }
                                            else{
                                                nd.description = this.form.value.description;
                                            }
                                            if (this.form.value.evaluate === "") {
                                                nd.state = this.lastEvaluate;
                                            }
                                            else{
                                                nd.state = this.form.value.evaluate;
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                    this.requestObject.data = JSON.stringify(this.requestObject.data);
                    this.HTTP.setDataSerializer('json');
                    console.log('test object put :', this.requestObject);
                    this.HTTP.put(auditSingleUrl,
                        this.requestObject,
                        {'Content-Type': 'application/json'})
                        .then(data => {
                                if (data.status == 200) {

                                    this.ndDescription = this.form.value.description;
                                    this.dataService.setData(2, this.requestObject);
                                    this.dataService.setSingleAudit(this.requestObject);
                                    var description = '';
                                    var evaluate = '';
                                    if (this.form.value.description === "") {
                                       description  = this.lastDescription;
                                    }
                                    else{
                                        description = this.form.value.description;
                                    }

                                    if (this.form.value.evaluate === "") {
                                        evaluate = this.lastEvaluate;
                                    }
                                    else{
                                        evaluate = this.form.value.evaluate;
                                    }
                                    setTimeout(() => {
                                        loadingEl.dismiss();
                                        this.presentAlert();
                                        this.onSubmit(description,evaluate);
                                    }, 1000);
                                } else {
                                    this.presentAlertFail();
                                    loadingEl.dismiss();
                                }
                            }
                        )
                        .catch(err => console.log('day la loi', err));
                })
                .catch(err => this.requestObject = err);
        });

    }

    async presentAlertFail() {
        const alert = await this.alertCtrl.create({
            header: 'Thông báo',
            subHeader: '',
            message: ' Update thất bại!!!',
            buttons: ['OK']
        });

        await alert.present();
    } ;

    async presentAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Thông báo',
            subHeader: '',
            message: 'Update thành công !!!',
            buttons: ['OK']
        });

        await alert.present();
    } ;

    onSubmit(Description,evaluate) {
        this.modalCtrl.dismiss({
            ndName: this.ndName,
            ndDescription: Description,
            ndState: evaluate
        }, 'save');
    }

    ngOnInit() {
        console.log('nnNAme',this.nnName);
        console.log('lvNAme',this.lvName);

        this.form = new FormGroup({
            description: new FormControl('', {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            evaluate: new FormControl('', {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
        });

    }

}
