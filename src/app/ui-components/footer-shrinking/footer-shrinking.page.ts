import { Component, OnInit } from '@angular/core';
import { IonicComponentService} from '../../services/ionic-component.service';
import { HideHeaderConfig } from '../../shared/hide-header.directive';
@Component({
  selector: 'app-footer-shrinking',
  templateUrl: './footer-shrinking.page.html',
  styleUrls: ['./footer-shrinking.page.scss'],
})
export class FooterShrinkingPage implements OnInit {
  footerScrollConfig: HideHeaderConfig = { cssProperty: 'margin-bottom', maxValue: 60};

  constructor(  private ionicComponentService: IonicComponentService ) { }

  ngOnInit() {
  }
  toggleSideMenu() {
    this.ionicComponentService.sideMenu();
    //this.menuCtrl.toggle(); //Add this method to your button click function
  }
  }
  
  