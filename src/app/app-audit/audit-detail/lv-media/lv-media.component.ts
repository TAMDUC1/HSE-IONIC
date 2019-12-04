import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {ModalController,ToastController,LoadingController} from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import {
    MediaCapture,
    MediaFile,
    CaptureError
} from '@ionic-native/media-capture/ngx';
import {HTTP} from '@ionic-native/http/ngx';
/*
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
*/

import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

const MEDIA_FOLDER_NAME = 'my_media';

@Component({
  selector: 'app-lv-media',
  templateUrl: './lv-media.component.html',
  styleUrls: ['./lv-media.component.scss'],
})
export class LvMediaComponent implements OnInit {

    files = [];

    constructor(
        private imagePicker: ImagePicker,
        private mediaCapture: MediaCapture,
        private file: File,
        private media: Media,
        private HTTP :HTTP,
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
    ) {}
    onCancel(){
        this.modalCtrl.dismiss(null,'cancel');

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
        });
    }
    loadFiles() {
        this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
            res => {
                this.files = res;
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

        // If you get problems on Android, try to ask for Permission first
        // this.imagePicker.requestReadPermission().then(result => {
        //   console.log('requestReadPermission: ', result);
        //   this.selectMultiple();
        // });
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
        const newName = `${d}.${ext}`;

        const name = myPath.substr(myPath.lastIndexOf('/') + 1);
        const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
        const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;

        this.file.copyFile(copyFrom, name, copyTo, newName).then(
            success => {
                this.loadFiles();
              //  this.onCancel();

            },
            error => {
                console.log('error: ', error);
            }
        );
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
    startUpload(imgEntry) {
        const path = imgEntry.nativeURL;
     //   const path = imgEntry.nativeURL.substr(0, imgEntry.nativeURL.lastIndexOf('/') + 1);

        this.file.resolveLocalFilesystemUrl(path)
            .then(entry =>
            {
                ( < FileEntry > entry).file(file => this.readFile(file))
            })
            .catch(err => {
                this.presentToast('Error while reading file.');
            });
    }
    readFile(file: any) {
        console.log('read file');
        const reader = new FileReader();
        reader.onloadend = () => {
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], {
                type: file.type
            });

            formData.append('file', imgBlob, file.name);
            console.log('formdata', formData);
            this.uploadImageData(formData);
        };
        reader.readAsArrayBuffer(file);
    }

    async uploadImageData(formData: FormData) {
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


        this.http.post("http://54.169.202.105:5000/api/DocumentsUpload", formData)
            .pipe(
                finalize(() => {
                    loading.dismiss();
                })
            )
            .subscribe(res => {
                if (res['success']) {
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
}
