import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataService} from '../../../services/audit/data.service';
import {trigger, state, style, animate, transition, group} from '@angular/animations';
import {AuditItemEvaluateComponent} from '../audit-item-evaluate/audit-item-evaluate.component';
import {AuditImageZoomComponent} from '../audit-image-zoom/audit-image-zoom.component';
import {LvMediaComponent} from '../lv-media/lv-media.component';
import {HTTP} from '@ionic-native/http/ngx';
import {HttpClient, HttpHeaders} from '@angular/common/http';

//import {HTTP} from '@ionic-native/http/ngx';
const headerDict = {
    'Content-Type': 'application/json',
};

const httpOptions = {
    headers: new HttpHeaders(headerDict)
};

@Component({
    selector: 'app-lv-modal',
    templateUrl: './lv-modal.component.html',
    styleUrls: ['./lv-modal.component.scss'],
    animations: [
        /*
            trigger('fadein',[
                state('void',style({opacity:0})),
                transition('void =>*',[
                    style({opacity:0}),
                    animate('0.3s 500ms ease-in', style({
                        opacity: 1
                    }))
                ])
            ])
        */
        trigger('EnterLeave', [
            state('flyIn', style({transform: 'translateX(0)'})),
            transition(':enter', [
                style({transform: 'translateX(-100%)'},),
                /* group([
                     animate('0.5s 300ms ease-in',style({opacity: 1}))
                    // animate('200ms ease-in-out', style({'opacity': '0'}))
                 ])*/
                animate('0.5s 300ms ease-in')
            ]),
            transition(':leave', [
                /*  group([
                      animate(300, style({height: '*'})),
                      animate('0.3s ease-out', style({ transform: 'translateX(-100%)' }))
                    //  animate('400ms ease-in-out', style({'opacity': '1'}))
                  ])*/
                animate('0.3s ease-out', style({transform: 'translateX(-100%)'}))
            ])
        ])
    ]
})

export class LvModalComponent implements OnInit {
    files;
    filesArr = [];
    uuid;
    nnName;
    lvName;
    ndName;
    content;
    private type = 'all';
    private message: string;
    private state: string;

    //private files = {};

    constructor(private modalCtrl: ModalController,
                private dataService: DataService,
                private router: Router,
                private HTTP: HTTP,
                private http: HttpClient
                // private HTTP :HTTP,
    ) {
    }

    onCancel() {
        this.modalCtrl.dismiss(null, 'cancel');

    }

    onSubmit() {
        this.modalCtrl.dismiss({
            message: this.message,
            state: this.state
        }, 'save');
    }

    ionViewWillEnter() {
        this.dataService.File.subscribe((file) => {
            this.filesArr = file;
        });
    }

    ionViewDidEnter() {

    }

    ngOnInit() {
        //http://54.169.202.105:5000/content/uploads/2019/11/16/82a611-120011.jpg
        this.dataService.File.subscribe((file) => {
            this.filesArr = file;
            console.log('this.filesArr',this.filesArr);
        });
        /*var imgUrl = 'http://54.169.202.105:5000/content/uploads/';
        this.files.data.forEach(e=>{
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
        /* var file_url = 'http://54.169.202.105:5000/api/CoreFileUploads/'.concat(this.uuid);
         this.HTTP.get(file_url,{},{
             'Content-Type' : 'application/json'
         }).then(res=> {
                 res.data = JSON.parse(res.data);
                 res.data.forEach(e => {
                     e.data = JSON.parse(e.data);
                     var temp = {
                         path : e.data.path,
                         name : e.data.name,
                         typeProblem : e.data.typeProblem
                     };
                     this.files.push(temp);
                     console.log('path idag ...',e.data.path);
                 });
                 //console.log('files ...',this.files);
             }
         );*/
    }

    openItemDetail(url, nnName, lvName, ndName) {
        console.log(url, nnName, lvName, ndName);
        this.dataService.setNd(ndName);
        this.onCancel();
        this.router.navigateByUrl('/' + url + '/' + this.uuid + '/' + nnName + '/' + lvName + '/' + ndName);
    }

    expand(i) {
        // check if
        this.content[0].forEach(function (e, index) {
            if (index == i) {
                e.expanded = !e.expanded;
            }
        });

    }

    openMedia(typeProblem) {
        this.modalCtrl.create({
            component: LvMediaComponent,
            componentProps: {
                uuid: this.uuid,
                typeProblem: typeProblem,
                filesArr: this.filesArr,

                /*filesArr: this.filesArr,
                index: image,
                nd : nd*/
            }
        }).then(modal => {
            modal.present();
        });
    }

    openImageViewer(image, nd) {
        this.modalCtrl.create({
            component: AuditImageZoomComponent,
            componentProps: {
                filesArr: this.filesArr,
                index: image,
                nd: nd
            }
        }).then(modal => {
            modal.present();
        });
    }

    openModal(ndName, descriptiption, evaluate) {
        this.modalCtrl.create({
            component: AuditItemEvaluateComponent,
            backdropDismiss: false,
            /* enterAnimation: myEnterAnimation,
             leaveAnimation: myLeaveAnimation,*/
            // cssClass: 'from-middle-modal',
            componentProps: {
                uuid: this.uuid,
                nnName: this.nnName,
                lvName: this.lvName,
                ndName: ndName,
                lastDescription: descriptiption,
                lastEvaluate: evaluate
                /*uuid : this.uuid,
                nnName : nnName,
                lvName : lvName,
                ndName :'',
                content : tempChildren*/
            }
        }).then(modalEl => {
            modalEl.present();
            return modalEl.onDidDismiss();
        }).then(resultData => {
            if (resultData.role === 'save') {
                this.content[0].forEach(e => {
                    if (e.name == ndName) {
                        e.description = resultData.data.ndDescription;
                        e.state = resultData.data.ndState;
                    }
                });
                //  this.ndDescription = resultData.data.ndDescription;
                // this.ndState = resultData.data.ndState;
            }
        });
    }


}
