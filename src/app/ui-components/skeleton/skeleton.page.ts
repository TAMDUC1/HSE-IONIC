import { Component, OnInit } from '@angular/core';
import { IonicComponentService} from '../../services/ionic-component.service';
@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.page.html',
  styleUrls: ['./skeleton.page.scss'],
})
export class SkeletonPage implements OnInit {

  constructor(  private ionicComponentService: IonicComponentService ) { }


  ngOnInit() {
  }
  toggleSideMenu() {
    this.ionicComponentService.sideMenu();
    //this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
