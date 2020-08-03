import { Component, OnInit } from '@angular/core';
import {IonicComponentService} from '../../services/ionic-component.service';
import {HTTP} from '@ionic-native/http/ngx';
import {ModalController, ToastController} from '@ionic/angular';
import {NewDetailComponent} from './new-detail/new-detail.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.page.html',
  styleUrls: ['./news-home.page.scss'],
})
export class NewsHomePage implements OnInit {
    requestNews : any = null;
    dowloadNews = [];
    constructor(
      private ionicComponentService: IonicComponentService,
      private HTTP :HTTP,
      private toastController: ToastController,
      private modalController: ModalController,

    ) { }

  ngOnInit() {
      this.loadNews();
  }
  loadNews(){

          let url = environment.url;
          this.HTTP.get(environment.apiPost,{},{
              'Content-Type' : 'application/json'
          }).then(res =>{
              this.requestNews = JSON.parse(res.data);
              this.requestNews.forEach((e)=>
              {
                  e.data = JSON.parse(e.data);
                  if(e.data.detail.vi){
                      var temp = {
                          desc : e.data.desc.vi,
                          detail : e.data.detail.vi,
                          image : url.concat(e.data.image.vi[0]),
                          title : e.data.title.vi
                      };
                      this.dowloadNews.push(temp);
                  }
                  console.log('News',this.dowloadNews);
              });
            //  console.log('doc',this.dowloadNews);

          }).catch(err => console.log (err))
      }

  toggleSideMenu() {
      this.ionicComponentService.sideMenu();
      // this.test.getapiServiceHse();
      //this.menuCtrl.toggle(); //Add this method to your button click function
  }
  openNewDetail(index){
        console.log(this.dowloadNews[index]);
        var re = /..\/..\//gm;
        var newstr = this.dowloadNews[index].detail.replace(re, "http://222.255.252.41");
        console.log('new string',newstr);
      // open modal detail
      try {
          // this.dataService.setObj(nnName,lvName);// save nn va lv
          this.modalController.create({
              component : NewDetailComponent,
              backdropDismiss: false,
              /* enterAnimation: myEnterAnimation,
               leaveAnimation: myLeaveAnimation,*/
              // cssClass: 'from-top-modal-filter',
              componentProps :{
                  desc : this.dowloadNews[index].desc,
                 // detail : this.dowloadNews[index].detail,
                  detail : newstr,

                  //  image : url.concat(e.data.image.vi[0]),
                  title : this.dowloadNews[index].title
              }
          }).then(modalEl =>{
              modalEl.present();
              console.log(this.dowloadNews[index].detail);
          })

      }
      catch(err) {
          console.log('Error: ', err.message);
      }
  }

}
