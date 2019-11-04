import { Component, OnInit,ViewChild , ElementRef  } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import { IonicComponentService } from '../../services/ionic-component.service';
@Component({
  selector: 'app-header-hide-title',
  templateUrl: './header-hide-title.page.html',
  styleUrls: ['./header-hide-title.page.scss'],
})
export class HeaderHideTitlePage implements OnInit {

  showLiner = false;
  showTitle = false;
  transition:boolean = false;


  
  constructor(
    private ionicComponentService: IonicComponentService 
  ) { }

  ngOnInit() {
  }
  
  toggleSideMenu() {
    this.ionicComponentService.sideMenu();
    //this.menuCtrl.toggle(); //Add this method to your button click function
  }



  onScroll($event: CustomEvent) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.transition = true;

      this.showTitle = scrollTop >= 44;
      this.showLiner = scrollTop >= 44;
      console.log("showTitle="+this.showTitle);
    }else{
      this.transition = false;
    }
  }
}
