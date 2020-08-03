import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {ModalController,ToastController,LoadingController} from '@ionic/angular';
// @ts-ignore
import { ImagePicker } from '@ionic-native/image-picker/ngx';
//import { ImagePicker } from '@ionic-native/image-picker';
import { ActionSheetController, Platform } from '@ionic/angular';
import {
    MediaCapture,
    MediaFile,
    CaptureError
} from '@ionic-native/media-capture/ngx';
import { Guid } from "guid-typescript";
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import {HTTP} from '@ionic-native/http/ngx';
import { Res} from './Res';
/*
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
*/

import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, take } from 'rxjs/operators';
import {DataService} from '../../../services/audit/data.service';

const MEDIA_FOLDER_NAME = 'my_media';
const headerDict = {
    'Content-Type': 'application/json',
};

const httpOptions = {
    headers: new HttpHeaders(headerDict)
};
@Component({
  selector: 'app-lv-media',
  templateUrl: './lv-media.component.html',
  styleUrls: ['./lv-media.component.scss'],

})
export class LvMediaComponent implements OnInit {
    uuid;
    filesArr;
    dataBack = [];
    typeProblem;
    files = [];

   // files = new BehaviorSubject([]);
    message: string = "";

    constructor(
        private imagePicker: ImagePicker,
        private mediaCapture: MediaCapture,
        private file: File,
        private media: Media,
        private HTTP :HTTP,
        private dataService: DataService,

        // private transfer: FileTransfer,
        private streamingMedia: StreamingMedia,
        private photoViewer: PhotoViewer,
        private actionSheetController: ActionSheetController,
        private plt: Platform,
        private modalCtrl : ModalController,
        private ref: ChangeDetectorRef,
        private toastController: ToastController,
        private loadingController: LoadingController,
        private http: HttpClient,
        private route: ActivatedRoute,

    ) {}
    onCancel(){
        this.modalCtrl.dismiss(this.dataBack,'cancel');

    }

    ngOnInit() {
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
           /* this.route.paramMap.subscribe(paramMap =>{
               this.uuid = paramMap.get('uuid');
            })*/
        });
    }
   /* addData(foo: any): void {
        this.files.next([...this.files.getValue(), ...foo])
    }*/
    uploadAll(){
        console.log('upload all');
    }
    loadFiles() {
        this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
            res => {
                console.log('res',res);
                this.files = [];
                res.forEach(e=>{
                    this.files = this.files.concat(e);
                    this.ref.detectChanges();

                });

                /* if(this.files.length > 0){
                     res.forEach(e=>{
                         this.files.forEach(el => {//loop
                             if(el.name == e.name){

                             }
                             else{
                                 this.files.concat(el);
                             }
                         })
                     })
                 }else{
                     res.forEach(e=>{
                         this.files.concat(e);
                     })
                 }*/

                //this.files = [];
               // this.ref.detectChanges();
                /*res.forEach(e =>{
                    if(this.files.length > 0){
                        this.files.forEach(el=>{
                            if(e.name != el.name){
                                this.files.push(e);
                                this.ref.detectChanges();
                            }
                        });
                    }
                    else {
                        this.files = res;
                        this.ref.detectChanges();
                    }

                });*/
               // this.addData(res);
               // this.files = res;
                console.log('this.file',this.files);
               // this.ref.detectChanges();
            },
            err => console.log('error loading files: ', err)
        );
    }



    async selectMedia() {
        const actionSheet = await this.actionSheetController.create({
            header: 'What would you like to add?',
            buttons: [
                {
                    text: 'Capture Image',
                    handler: () => {
                        this.captureImage();
                    }
                },
                {
                    text: 'Record Video',
                    handler: () => {
                        this.recordVideo();
                    }
                },
                {
                    text: 'Record Audio',
                    handler: () => {
                        this.recordAudio();
                    }
                },
                {
                    text: 'Load multiple',
                    handler: () => {
                        this.pickImages();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    pickImages() {
        this.imagePicker.getPictures({}).then(
            results => {
                for (var i = 0; i < results.length; i++) {
                    this.copyFileToLocalDir(results[i]);
                }
            }
        );
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
        if (f.name.indexOf('.wav') > -1) {
            // We need to remove file:/// from the path for the audio plugin to work
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
    startUpload(imgEntry,index) {
        const path = imgEntry.nativeURL;
        const path2 = imgEntry.nativeURL.substr(0, imgEntry.nativeURL.lastIndexOf('/') + 1);

        this.file.resolveLocalFilesystemUrl(path)
            .then(entry =>
            {
                ( < FileEntry > entry).file(file => this.readFile(file,index))
            })
            .catch(err => {
                this.presentToast('Error while reading file.');
            });
    }
    readFile(file: any,index) {
        console.log('read file');
        const reader = new FileReader();
        reader.onloadend = () => {
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], {
                type: file.type
            });

            formData.append('file', imgBlob, file.name);
            this.uploadImageData(formData,file.type,index);
        };
        reader.readAsArrayBuffer(file);
    }

    async uploadImageData(formData: FormData,type,index) {
        console.log('formdata', formData);

        const loading = await this.loadingController.create({
            message: 'Uploading image...',
        });
        await loading.present();

        /*this.HTTP.put(auditSingleUrl,
            this.requestObject,
            {"Content-Type": "application/json"})
            .then(data => {
                    if(data.status == 200){
                        this.ndDescription = this.form.value.description;
                        //this.requestObject.data = JSON.parse(this.requestObject.data);
                        this.dataService.setData(2,this.requestObject);
                        // var temp= JSON.parse(this.dataService.getData(2).data.checkList);
                        //   console.log('test save data lai.....',temp);
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
            .catch(err => console.log('day la loi',err));*/


        this.http.post("http://222.255.252.41/api/DocumentsUpload", formData)
            .pipe(
                finalize(() => {
                    loading.dismiss();
                })
            )
            .subscribe((res : any) => {
                if (res) {
                    const temp = res;
                    var data = {
                        ext : "",
                        attr :"",
                        lang : "",
                        name : temp.name,
                        path : temp.path,
                        type : type,
                        title : "",
                        typeProblem: this.typeProblem
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

                    this.http.post("http://222.255.252.41/api/CoreFileUploads",requestObject,httpOptions)
                        .subscribe(
                            data => {
                                var imgUrl = 'http://222.255.252.41/uploads/';
                                var temp = JSON.parse(JSON.stringify(data));
                                temp.data = JSON.parse(temp.data);
                                console.log('tempdata',temp.data);
                                var path = imgUrl.concat(temp.data.path);
                                path = path.concat('/');
                                var databack = {
                                    name : temp.data.name,
                                    path : path.concat(temp.data.name),
                                    typeProblem : temp.data.typeProblem,
                                    uuid : requestObject.uuid
                                };
                                // add to service observer
                                this.dataService.File.pipe(take(1)).subscribe(file =>{
                                    temp = file.concat(databack);
                                    this.dataService.setFile(this.uuid,temp);
                                });
                                this.deleteFile(this.files[index]);// delete after upload
                                this.message ="Bạn Đã Gửi Thành Công" },
                            error =>{console.log("error",error)}
                        )
                    ;
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

}
