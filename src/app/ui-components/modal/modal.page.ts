import { Component, OnInit } from '@angular/core';
import { ModalController,NavController} from '@ionic/angular';
import { IonicComponentService} from '../../services/ionic-component.service';
import { ModalDetailPage } from '../modal-detail/modal-detail.page';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(
    private ionicComponentService: IonicComponentService ,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }


  toggleSideMenu() {
    this.ionicComponentService.sideMenu();
    //this.menuCtrl.toggle(); //Add this method to your button click function
  }


  //******** bottom ***********//
  openBottomModal() {
    this.modalController.create({
      component: ModalDetailPage,
      cssClass: 'from-bottom-modal',
      componentProps: {
        // data: this.placeArray,
        // index: image
      }
    }).then(modal => {
      modal.present();
    });
  }

//******** Top ***********//
  openTopModal() {
    this.modalController.create({
      component: ModalDetailPage,
      cssClass: 'from-top-modal',
      componentProps: {
        // data: this.placeArray,
        // index: image
      }
    }).then(modal => {
      modal.present();
    });
  }

  //******** Middle ***********//
  openMiddleModal() {
    this.modalController.create({
      component: ModalDetailPage,
      cssClass: 'from-middle-modal',
      componentProps: {
        // data: this.placeArray,
        // index: image
      }
    }).then(modal => {
      modal.present();
    });
  }

  //******** Full ***********//
  openFullModal(image) {
    this.modalController.create({
      component: ModalDetailPage,
      componentProps: {
        // data: this.placeArray,
        // index: image
      }
    }).then(modal => {
      modal.present();
    });
  }


}
