import { Component, OnInit } from '@angular/core';

import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { MenuController,ModalController,NavController,LoadingController} from '@ionic/angular';
import { firestore } from 'firebase/app' // new version : ex arrayContanin, arrayUnion
import * as firebase from 'firebase';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.page.html',
  styleUrls: ['./masonry.page.scss'],
})
export class MasonryPage implements OnInit {

  public lists: Observable<any[]>;
  constructor(
    public menuCtrl: MenuController,
    private firestore: AngularFirestore
  ) {

  }



  ngOnInit() {
    console.log("start")
    this.lists = this.firestore.collection<any>('layout_masonry').valueChanges();
  }
  getFeed(){
    console.log("start getCategory");
     
  
  }
  toggleSideMenu() {
    console.log("call toggleSideMenu")
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
