import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.page.html',
  styleUrls: ['./modal-detail.page.scss'],
})
export class ModalDetailPage implements OnInit {

  constructor(
    private navParams: NavParams, 
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  close() {
    this.modalController.dismiss();
  }

}
