import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
  selector: 'app-audit-home-filter',
  templateUrl: './audit-home-filter.component.html',
  styleUrls: ['./audit-home-filter.component.scss'],
})
export class AuditHomeFilterComponent implements OnInit {
  filterDate;
  constructor(private modalCtrl: ModalController,
            //  private HTTP :HTTP,
  ) { }

  ngOnInit() {}
    onCancel(){
        this.modalCtrl.dismiss(null,'cancel');
    }
    onSubmit(){

        this.modalCtrl.dismiss({year:2019,
                                      status: 'done'},'save');
    }
}
