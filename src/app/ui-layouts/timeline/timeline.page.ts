import { Component, OnInit } from '@angular/core';

import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { MenuController,ModalController,NavController,LoadingController} from '@ionic/angular';
import { firestore } from 'firebase/app' // new version : ex arrayContanin, arrayUnion

import { Observable } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  public timelines: Observable<any[]>;
  constructor(
    public menuCtrl: MenuController,
    private firestore: AngularFirestore
  ) {

  }

  toggleSideMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  ngOnInit() {
    console.log("start")
    this.timelines = this.firestore.collection<any>('layout_timeline').valueChanges();
  }
  getFeed(){
    console.log("start getCategory");
     
  
  }
}
