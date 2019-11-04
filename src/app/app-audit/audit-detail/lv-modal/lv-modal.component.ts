import { Component,Input, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lv-modal',
  templateUrl: './lv-modal.component.html',
  styleUrls: ['./lv-modal.component.scss']
})
export class LvModalComponent implements OnInit {

    uuid;
    nnName;
    lvName;
    ndName;
    content;
    private message : string;
    private state : string;
  constructor( private modalCtrl : ModalController,
               private router: Router) { }

  onCancel(){
      this.modalCtrl.dismiss(null,'cancel');

  }

  onSubmit(){
      this.modalCtrl.dismiss({message:this.message,
          state: this.state},'save');
  }

  ngOnInit() {
  }

    openItemDetail(url,nnName,lvName,ndName){
        this.onCancel();
        this.router.navigateByUrl('/'+url+'/'+this.uuid+'/'+nnName+'/'+lvName+'/'+ndName);
    }
}
