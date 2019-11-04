import { Component, OnInit,ViewChild , ElementRef  } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { MenuController,IonContent,NavParams,NavController} from '@ionic/angular';
import { IonicComponentService } from '../../services/ionic-component.service';
@Component({
  selector: 'app-header-transparent',
  templateUrl: './header-transparent.page.html',
  styleUrls: ['./header-transparent.page.scss'],
})
export class HeaderTransparentPage implements OnInit {

  constructor(    private ionicComponentService: IonicComponentService) { }

  ngOnInit() {
  }

  toggleSideMenu() {
    this.ionicComponentService.sideMenu();
    //this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
