import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { ActivatedRoute , Router} from '@angular/router';
import { NavController} from '@ionic/angular';

import { IonicComponentService } from '../../services/ionic-component.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
})
export class Profile2Page implements OnInit {
  following: boolean = false;
  profile2:  Observable<any>;




  constructor(   
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    public router: Router,
    private ionicComponentService: IonicComponentService) { 

    }

  ngOnInit() {
        //****** open loading ********/
        this.ionicComponentService.presentLoading();
        console.log("start")
        this.profile2 =  this.firestore.doc<any>('layout_profile/saweU7IYmZAdXupac9LD').valueChanges();
        this.ionicComponentService.dismissLoading();
        
  }
  follow() {
    this.following = !this.following;
    this.ionicComponentService.presentToast('Follow user clicked',2000);
  }
  toggleSideMenu() {
    console.log("call toggleSideMenu ")
    this.ionicComponentService.sideMenu(); //Add this method to your button click function
  }
}
