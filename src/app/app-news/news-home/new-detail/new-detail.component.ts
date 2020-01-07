import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.scss'],
})
export class NewDetailComponent implements OnInit {
  desc;
  detail;
  title;
  constructor(
      private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}
    onCancel(){
        this.modalCtrl.dismiss(null,'cancel');
    }
}
