import { Component, OnInit } from '@angular/core';
import {IonicComponentService} from '../../services/ionic-component.service';
import {HTTP} from '@ionic-native/http/ngx';
import {Platform, ToastController, LoadingController} from '@ionic/angular';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-keywords-home',
  templateUrl: './keywords-home.page.html',
  styleUrls: ['./keywords-home.page.scss'],
})
export class KeywordsHomePage implements OnInit {
    requestObject : any = null;
    requestDoc : any = null;
    dowloadDoc = [];
    filteredDocArrs = [];
    compareArrs = [];
    private _searchTerm : string;
    get searchTerm():string{
        return this._searchTerm;
    }

    set searchTerm(value:string){
        this._searchTerm = value;
        this.filteredDocArrs = this.onFilter(value);
        /*this._searchTerm = value;
        this.filteredCompArrs = this.onFilter(value);*/
    }
    private loading;
  constructor(
      private ionicComponentService: IonicComponentService,
      private HTTP :HTTP,
      private platform : Platform,
      private file : File,
      private ft : FileTransfer,
      private fileOpener : FileOpener,
      private document : DocumentViewer,
      private toastController: ToastController,
      private loadingCtrl : LoadingController
  ) { }

  ngOnInit() {
      this.getHTTP();
      this.getDoc();
      this.filteredDocArrs = this.dowloadDoc;
  }
    changeLanguage(alias){
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
        str = str.replace(/đ/g,"d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        str = str.replace(/ + /g," ");
        str = str.trim();
        return str;
    }
    onFilter(searchString){
        var result = [];

        if(!searchString){
            result = this.dowloadDoc
        }
        else{
            var str = this.changeLanguage(searchString);// doi qua khong dau
            var keyS = str.trim();// bo dau cach
            this.compareArrs.forEach((e)=>{
                e.child.forEach(el =>{
                    if(keyS == el){
                        result = e.docList;
                    }
                })
            });
            if(result.length > 0){
                var tempArr = [];
                result.forEach(e =>
                {
                    this.dowloadDoc.forEach(el =>{
                        if(el.title == e){
                            tempArr.push(el);
                        }
                    })
                });
                result = tempArr;
            }
        }


      return result;
    }
    viewDoc(uuid){
        this.loadingCtrl.create({
            message : "Loading..."
        }).then((overlay)=>{
            this.loading = overlay;
            this.loading.present();

        });
        var url = 'http://54.169.202.105:5000/api/CoreFileUploads1/'.concat(uuid);
        var urlDoc = 'http://54.169.202.105:5000/content/uploads/';
        this.HTTP.get(url,{},{
            'Content-Type' : 'application/json'
        })
            .then(
            res =>{
                var tempRes = JSON.parse(res.data);
                var tempo = JSON.parse(tempRes[0].data);
                console.log('tempo.ext',tempo.ext);
                if(tempo.ext == 'pdf'|| tempo.type == 'application/pdf'){
                    tempo.path = tempo.path.replace(/\\/g, '/');
                    var link = tempo.path.concat(tempo.name);
                    urlDoc = urlDoc.concat(link);
                    let path = this.file.dataDirectory;
                    const transfer = this.ft.create();
                    //`${path}
                    transfer.download(urlDoc,path + uuid + ".pdf").then(entry =>{
                        let url = entry.toURL();
                        if(this.platform.is('ios')){
                            this.loading.dismiss();
                            this.document.viewDocument(url,'application/pdf',{});
                        } else{
                            this.loading.dismiss();
                            this.fileOpener.open(url, 'application/pdf');
                        }
                    })
                }
                else{
                    this.loading.dismiss();
                    this.presentToast('Chưa hỗ trợ đọc file này !!!');

                    console.log('not pdf type');// file ko phai pdf su ly sau
                }

            }
        )
            .catch(err => console.log(err))
    }
    toggleSideMenu() {
        this.ionicComponentService.sideMenu();
        // this.test.getapiServiceHse();
        //this.menuCtrl.toggle(); //Add this method to your button click function
    }
    getDoc(){
        this.HTTP.get('http://54.169.202.105:5000/api/CmsDocuments',{},{
            'Content-Type' : 'application/json'
        }).then(res =>{
            this.requestDoc = JSON.parse(res.data);
            this.requestDoc.forEach((e)=>
            {
                e.data = JSON.parse(e.data);
                var temp = {
                    uuid : e.uuid,
                    title : e.data.title.vi,
                };
                this.dowloadDoc.push(temp);

            });
            console.log('doc',this.dowloadDoc);

        }).catch(err => console.log (err))
    }
    getHTTP(refresh = false, refresher?){
        this.HTTP.get('http://54.169.202.105:5000/api/CoreCategories/c2107326-f6e5-424b-99bb-5084cbd871ed',{},{
            'Content-Type' : 'application/json'
        }).then(res => {
                this.requestObject = JSON.parse(res.data);
                var tempData = JSON.parse(this.requestObject.data);
                this.requestObject = tempData.items;
                console.log(this.requestObject);
                this.requestObject.forEach((e)=>
                {
                  var tempObject = {
                      child : [],
                      docList : [],
                      name :''
                  };
                  tempObject.docList = e.list;
                  tempObject.name = e.title.vi;
                  e.children.forEach(el => {
                      var str = this.changeLanguage(el.title.vi);
                      var keyS = str.trim();
                      tempObject.child.push(keyS);
                  });
                  this.compareArrs.push(tempObject);
                });
                console.log('CompareArr',this.compareArrs);

            }
        )
            .catch(err => this.requestObject = err)
        ;
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
