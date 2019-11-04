
import { Component, OnInit,ViewChild , ElementRef  } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { MenuController,IonContent,NavParams,NavController} from '@ionic/angular';
import { IonicComponentService } from '../../services/ionic-component.service';
@Component({
  selector: 'app-animation',
  templateUrl: './animation.page.html',
  styleUrls: ['./animation.page.scss'],
})
export class AnimationPage implements OnInit {
  viewMode: string = "set1";
  constructor(
    private ionicComponentService: IonicComponentService,
  ) { }

  ngOnInit() {
  }
  toggleSideMenu() {
    this.ionicComponentService.sideMenu();
    //this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
