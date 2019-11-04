import { Component, OnInit } from '@angular/core';
import { IonicComponentService} from '../../services/ionic-component.service';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {

  rating: number=1;
 
  constructor(  private ionicComponentService: IonicComponentService ) { }

  ngOnInit() {
  }

  onModelChange($event){
  }
  
  toggleSideMenu() {
    this.ionicComponentService.sideMenu();
    //this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
  
  
