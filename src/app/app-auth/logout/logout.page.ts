import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import { NavController } from '@ionic/angular';

import { IonicComponentService } from '../../services/ionic-component.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../../../../node_modules/firebase';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  redirectUrl: string;

public redirectPath: any;
  constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService:  UserService,
    private ionicComponentService: IonicComponentService,
  ) { 
    
  }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    console.log("----- logout")
    this.ionicComponentService.presentLoading();
    this.redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl');
    this.logout();
  }

  async logout(){

    // await this.userService.signoutUser()
    // .then(() => {
    //   if(this.redirectUrl){
    //     console.log("----- 1")
    //     this.ionicComponentService.presentToast("logged out",3000);
    //     //this.ionicComponentService.dismissLoading();
    //     this.router.navigateByUrl('/'+this.redirectUrl);

    //   }else{
    //     console.log("----- 2")
    //     this.ionicComponentService.presentToast("logged out",3000);
    //     //this.ionicComponentService.dismissLoading();
    //     this.router.navigateByUrl('/profile');

    //   }

    // }, (error) => { 
    //   var errorMessage: string = error.message;
    //   console.log("ERROR:"+errorMessage);
    //   this.ionicComponentService.presentToast(errorMessage,3000);
    //   this.ionicComponentService.dismissLoading();
      
    // });

  }

  

}
