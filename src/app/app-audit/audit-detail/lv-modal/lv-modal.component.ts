import {ChangeDetectorRef, Component, Input, OnInit ,SimpleChanges, OnChanges} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataService} from '../../../services/audit/data.service';
import {trigger, state, style, animate, transition, group} from '@angular/animations';
import {AuditItemEvaluateComponent} from '../audit-item-evaluate/audit-item-evaluate.component';
import {AuditImageZoomComponent} from '../audit-image-zoom/audit-image-zoom.component';
import {LvMediaComponent} from '../lv-media/lv-media.component';
import {HTTP} from '@ionic-native/http/ngx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActionSheetController, Platform } from '@ionic/angular';
import {CaptureError, MediaFile,MediaCapture} from '@ionic-native/media-capture/ngx';
import {File, FileEntry} from '@ionic-native/File/ngx';
import {MediaObject, Media} from '@ionic-native/media/ngx';
import {finalize, take} from 'rxjs/operators';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
//import { ImagePicker } from '@ionic-native/image-picker';
import {StreamingMedia} from '@ionic-native/streaming-media/ngx';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment} from '../../../../environments/environment';
import {getFileReader} from '../../../app.module';

const MEDIA_FOLDER_NAME = 'my_media';
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

export class LvModalComponent implements OnInit,OnChanges {


    files = [];
    filesArr = [];
    imageArr = [];
    uuid;
    nnName;
    lvName;
    typeProblem;
    form;
    content;
    lastDescription;
    lastEvaluate;
    ndDescription: string;
    ndState: string;
    private onEdit = false;
    private type = 'all';
    private message: string;
    private state: string;
    requestObject: any = null;

    private auditUrl =  environment.apiAudit;

    //private files = {};

    constructor(
        private loadingCtrl: LoadingController,
        private formBuilder: FormBuilder,
        private media: Media,
        private imagePicker: ImagePicker,
        private photoViewer: PhotoViewer,
        private streamingMedia: StreamingMedia,
        private toastController: ToastController,
        private ref: ChangeDetectorRef,
        private plt: Platform,
        private file: File,
        private mediaCapture: MediaCapture,
        private modalCtrl: ModalController,
        private loadingController: LoadingController,
        private dataService: DataService,
        private alertCtrl: AlertController,
        private router: Router,
                private HTTP: HTTP,
                private http: HttpClient,
                private actionSheetController: ActionSheetController,
                // private HTTP :HTTP,
    ) {
    }
    ngOnChanges(changes : SimpleChanges) {

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
            let lv = '';
            let title = '';
            let description = '';
            let state = '';
            var auditSingleUrl = this.auditUrl.concat(this.uuid);
            return this.HTTP.get(auditSingleUrl, {}, {
                'Content-Type': 'application/json'
            })
                .then(res =>
                {
                    this.requestObject = JSON.parse(res.data);
                    this.requestObject.data = JSON.parse(this.requestObject.data);
                    this.requestObject.data.checkList.forEach((e) => {
                        if (e.title.vi === this.nnName) {
                            lv = this.nnName;
                            e.children.forEach((el) => {
                                if (el.title.vi === this.lvName) {
                                    title = el.title.vi;
                                    if (this.form.value.description == null) {
                                        el.description = this.lastDescription;
                                        description = this.lastDescription;
                                    }
                                    else{

                                        el.description = this.form.value.description;
                                        description = this.form.value.description;
                                    }
                                    if (this.form.value.evaluate == null) {
                                        el.state = this.lastEvaluate;
                                        state = this.lastEvaluate;
                                    }
                                    else{
                                        el.state = this.form.value.evaluate;
                                        state = this.form.value.evaluate;
                                    }
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
                                    setTimeout(() => {
                                        loadingEl.dismiss();
                                        this.presentAlert();
                                        this.modalCtrl.dismiss({
                                                                     lv : lv,
                                                                     title: title,
                                                                     desciption : description,
                                                                     state : state}, 'save');

                                       // this.onSubmit(title,description,state);
                                    }, 1000);
                                 /*   this.ndDescription = this.form.value.description;
                                    this.dataService.setData(2, this.requestObject);
                                    this.dataService.setSingleAudit(this.requestObject);
                                    var description = '';
                                    var evaluate = '';
                                    if (this.form.value.description == null) {
                                        description  = this.lastDescription;
                                    }
                                    else{
                                        description = this.form.value.description;
                                        this.onEdit = true;
                                    }

                                    if (this.form.value.evaluate == null) {
                                        evaluate = this.lastEvaluate;
                                    }
                                    else{
                                        evaluate = this.form.value.evaluate;
                                        this.onEdit = true;
                                    }
                                    setTimeout(() => {
                                        loadingEl.dismiss();
                                        this.presentAlert();
                                        this.onSubmit(description,evaluate);
                                    }, 1000);*/
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
       // this.onCancel();

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

    onSubmit(Title,Description,evaluate) {
        this.modalCtrl.dismiss({
            ndName: Title,
            ndDescription: Description,
            ndState: evaluate
        }, 'save');
    }

    ionViewWillEnter() {
        this.dataService.File.subscribe((file) => {
            this.filesArr = file.filter(e => e.typeProblem === this.lvName);
        });
    }

    ionViewDidEnter() {

    }

    async ngOnInit() {
        this.plt.ready().then(() => {
            let path = this.file.dataDirectory;
            this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
                () => {
                    this.loadFiles();
                },
                err => {
                    this.file.createDir(path, MEDIA_FOLDER_NAME, false);
                }
            );
        });

        this.lastDescription = this.content.description;
        this.lastEvaluate = this.content.state;
        this.form = new FormGroup(
            {
            description : new FormControl(),
                evaluate : new FormControl()

        });
       //nnName;
       // lvName;
        console.log('nnNAme',this.nnName);
        console.log('lvNAme',this.lvName);
        console.log('description',this.form.value.description);
        console.log('evaluate',this.form.value.evaluate);

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

            }
        }).then(modal => {
            modal.present();
        });
    }

    openImageViewer(index, nd) {
        this.modalCtrl.create({
            component: AuditImageZoomComponent,
            componentProps: {
                filesArr: this.filesArr,
                index: index,
                nd: nd
            }
        }).then(modal => {
            modal.present();
            console.log(this.filesArr);
        });
    }
    async selectMedia() {
        const actionSheet = await this.actionSheetController.create({
           // header: 'What would you like to add?',
            buttons: [
                {
                    text: 'Chụp Ảnh',
                    handler: () => {
                        this.captureImage();
                    }
                },
                {
                    text: 'Quay Phim',
                    handler: () => {
                        this.recordVideo();
                    }
                },
                {
                    text: 'Ghi Âm',
                    handler: () => {
                        this.recordAudio();
                    }
                }/*,
                {
                    text: 'Load multiple',
                    handler: () => {
                        this.pickImages();
                    }
                }*/,
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
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

    pickImages() {
        this.imagePicker.getPictures({}).then(
            results => {
                console.log('results',results );

                for (var i = 0; i < results.length; i++) {
                    this.copyFileToLocalDir(results[i]);
                }
            }
        );
        //console.log('this.imageArr uuuuu',this.imageArr);
        //  this.ref.detectChanges();
        // If you get problems on Android, try to ask for Permission first
        /*  this.imagePicker.requestReadPermission().then(result => {
            console.log('requestReadPermission: ', result);
            this.selectMultiple();
          });*/

    }

    captureImage() {
        this.mediaCapture.captureImage().then(
            (data: MediaFile[]) => {
                if (data.length > 0) {
                    this.copyFileToLocalDir(data[0].fullPath);
                }
            },
            (err: CaptureError) => console.error(err)
        );
        // this.ref.detectChanges();
    }

    recordAudio() {
        this.mediaCapture.captureAudio().then(
            (data: MediaFile[]) => {
                if (data.length > 0) {
                    this.copyFileToLocalDir(data[0].fullPath);
                }
            },
            (err: CaptureError) => console.error(err)
        );

    }

    recordVideo() {
        this.mediaCapture.captureVideo().then(
            (data: MediaFile[]) => {
                if (data.length > 0) {
                    this.copyFileToLocalDir(data[0].fullPath);
                }
            },
            (err: CaptureError) => console.error(err)
        );

    }
    copyFileToLocalDir(fullPath) {
        let myPath = fullPath;
        // Make sure we copy from the right location
        if (fullPath.indexOf('file://') < 0) {
            myPath = 'file://' + fullPath;
        }

        const ext = myPath.split('.').pop();
        const d = Date.now();
        // const newName = `${d}.${ext}`;
        const newName = `${this.uuidv4()}.${ext}`;


        const name = myPath.substr(myPath.lastIndexOf('/') + 1);
        const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
        const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;
        this.file.copyFile(copyFrom, name, copyTo, newName).then(
            success => {
                this.loadFiles();
                //  this.onCancel();

            },
            error => {
                console.log('error: asdad', error);
            }
        );
        this.ref.detectChanges();
    }

    openFile(f: FileEntry) {
        console.log(f);
        if (f.name.indexOf('.wav') > -1) {
            // We need to remove file:/// from the path for the audio plugin to work
            console.log(f,'wav');
            const path =  f.nativeURL.replace(/^file:\/\//, '');
            const audioFile: MediaObject = this.media.create(path);
            audioFile.play();
        } else if (f.name.indexOf('.MOV') > -1 || f.name.indexOf('.mp4') > -1) {
            // E.g: Use the Streaming Media plugin to play a video
            this.streamingMedia.playVideo(f.nativeURL);
        } else if (f.name.indexOf('.jpg') > -1) {
            // E.g: Use the Photoviewer to present an Image
            this.photoViewer.show(f.nativeURL, 'MY awesome image');
        }
    }

    deleteFile(f: FileEntry) {
        const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
        this.file.removeFile(path, f.name).then(() => {

            this.loadFiles();
        }, err => console.log('error remove: ', err));
    }
    async startUpload(imgEntry,index,typeProblem) {
        console.log(imgEntry);
        console.log('upload');
        const path = imgEntry.nativeURL;
        this.file.resolveLocalFilesystemUrl(path)
            .then(entry =>
            {
                console.log(entry);
                ( < FileEntry > entry).file(file => this.readFile(file,index,typeProblem))
            })
            .catch(err => {
                this.presentToast('Error while reading file.');
            });
    }
    async readFile(file: any,index,typeProblem) {
        console.log(file);
        console.log('read file');
        const reader = getFileReader();
        reader.onloadend = () => {
            console.log('vao day');
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], {
                type: file.type
            });

            formData.append('file', imgBlob, file.name);
            this.uploadImageData(formData,file.type,index,typeProblem);
        };
        reader.readAsArrayBuffer(file);
    }

    async uploadImageData(formData: FormData,type,index,typeProblem) {
        console.log('typeProb uploadimagedata',typeProblem);
      //  console.log('formdata', formData);

        const loading = await this.loadingController.create({
            message: 'Uploading image...',
        });
        await loading.present();
        this.http.post( environment.docUpload, formData)
            .pipe(
                finalize(() => {
                    loading.dismiss();
                })
            )
            .subscribe((res : any) => {
                if(type.indexOf('jpeg')){
                    type = 'jpeg';
                }
                /*if(type.indexOf('jpg')){
                    type = 'jpg';
                }*/
               /* if(type.indexOf('wav')){
                    type = 'wav';
                }
                if(type.indexOf('MOV')){
                    type = 'MOV';
                }*/
               // f.name.indexOf('.wav'
                if (res) {
                    const temp = res;
                    var data = {
                        ext : type,
                        attr :"",
                        lang : "",
                        name : temp.name,
                        path : temp.path,
                        type : type,
                        title : "",
                        typeProblem: typeProblem
                    };
                    var data2 = JSON.stringify(data);
                    var requestObject = {
                        uuid : this.uuidv4(),
                        data : data2,
                        workflow : null,
                        module : temp.module,
                        model : temp.model,
                        modelUuid : this.uuid
                    } ;
                    /* var obj2 =  JSON.stringify(requestObject);
                       this.HTTP.setDataSerializer('json');
                       this.HTTP.setDataSerializer( "utf8" );*/    //https://stackoverflow.com/questions/51417208/ionic-native-http-call-with-content-type-text-plan

                    this.http.post(environment.coreFileUpload ,requestObject,httpOptions)
                        .subscribe(
                            data => {
                                console.log('data 2020',data);
                                var imgUrl =environment.upload;
                                var temp = JSON.parse(JSON.stringify(data));
                                temp.data = JSON.parse(temp.data);
                                var path = imgUrl.concat(temp.data.path);
                                path = path.concat('/');
                                var databack = {
                                    name : temp.data.name,
                                    path : path.concat(temp.data.name),
                                    typeProblem : typeProblem,
                                    uuid : requestObject.uuid,
                                    uuid_img : temp.uuid
                                };
                                // add to service observer
                                this.dataService.File.pipe(take(1)).subscribe(file =>{
                                    temp = file.concat(databack);
                                    this.dataService.setFile(this.uuid,temp);
                                });
                                console.log('requestObject',requestObject);
                                this.deleteFile(this.files[index]);// delete after upload
                                this.message ="Bạn Đã Gửi Thành Công" },

                            error =>{console.log("error",error)}
                        )
                    ;
                    console.log('data',data);
                    this.presentToast('File upload thành công.')
                } else {
                    this.presentToast('File upload thất bại.')
                }
            });
    }
    async presentToast(text) {
        const toast = await this.toastController.create({
            message: text,
            position: 'bottom',
            duration: 3000
        });
        toast.present();
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    loadFiles() {
        this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
            res => {
                console.log('resrrrr',res);
                this.files = [];
                this.imageArr = [];
                res.forEach(e=>{
                    this.files = this.files.concat(e);
                    this.ref.detectChanges();
                });
            },
            err => console.log('error loading files: ', err)
        );
    }

}
