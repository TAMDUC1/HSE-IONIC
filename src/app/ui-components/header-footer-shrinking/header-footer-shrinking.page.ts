import { Component, OnInit } from '@angular/core';
import { IonicComponentService} from '../../services/ionic-component.service';
import { HideHeaderConfig } from '../../shared/hide-header.directive';

@Component({
  selector: 'app-header-footer-shrinking',
  templateUrl: './header-footer-shrinking.page.html',
  styleUrls: ['./header-footer-shrinking.page.scss'],
})
export class HeaderFooterShrinkingPage implements OnInit {

 // footerScrollConfig: HideHeaderConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
 footerScrollConfig: HideHeaderConfig = { cssProperty: 'margin-bottom', maxValue: 60 };
 headerScrollConfig: HideHeaderConfig = { cssProperty: 'margin-top', maxValue: 40};

constructor(  private ionicComponentService: IonicComponentService ) { }

ngOnInit() {
}
toggleSideMenu() {
  this.ionicComponentService.sideMenu();
  //this.menuCtrl.toggle(); //Add this method to your button click function
}
}

