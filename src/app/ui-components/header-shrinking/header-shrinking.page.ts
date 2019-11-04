import { Component, OnInit } from '@angular/core';
import { IonicComponentService} from '../../services/ionic-component.service';
import { HideHeaderConfig } from '../../shared/hide-header.directive';

@Component({
  selector: 'app-header-shrinking',
  templateUrl: './header-shrinking.page.html',
  styleUrls: ['./header-shrinking.page.scss'],
})
export class HeaderShrinkingPage implements OnInit {
 //****** Hide header ********/
 headerScrollConfig: HideHeaderConfig = { cssProperty: 'margin-top', maxValue: 40};

  constructor(  private ionicComponentService: IonicComponentService ) { }

  ngOnInit() {
  }
  toggleSideMenu() {
    this.ionicComponentService.sideMenu();
    //this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
