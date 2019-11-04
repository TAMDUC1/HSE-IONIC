import { Component, OnInit } from '@angular/core';

import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';

import { ActivatedRoute , Router} from '@angular/router';
import { MenuController,IonTabs,ModalController,AlertController,NavController, LoadingController} from '@ionic/angular';

import { RadioService } from '../../services/radio.service';
import { IonicComponentService } from '../../services/ionic-component.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.page.html',
  styleUrls: ['./profile1.page.scss'],
})
export class Profile1Page implements OnInit {
  following: boolean = false;
  profile:  Observable<any>;

  constructor(   
    private firestore: AngularFirestore,
    public menuCtrl: MenuController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private modalController: ModalController,
    public router: Router,
    public alertController: AlertController,
    private ionicComponentService: IonicComponentService) { 
    }

  ngOnInit() {
    this.profile = this.firestore.doc<any>('layout_profile/GedsU7IYmZAdXupac9LD').valueChanges();

  }
  follow() {
    this.following = !this.following;
    this.ionicComponentService.presentToast('Follow user clicked',2000);
  }
  toggleSideMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
