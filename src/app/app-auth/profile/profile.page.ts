import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';

import { IonicComponentService } from '../../services/ionic-component.service';
//import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //userDetail: Observable<any>;
  userDetail: any;
  public updateForm: FormGroup;
  userDetailSub: any;

  constructor(
    public userService: UserService,
    public menuCtrl: MenuController,
    private navController: NavController,
    public router: Router,
    private ionicComponentService: IonicComponentService,
    public  formBuilder: FormBuilder
  ) {
    let EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  
// Tips: If you can't bind to 'formGroup' since it isn't a known property of 'form'.
//  ******Don't forgot to import FormsModule and ReactiveFormsModule into your <page-name>.module.ts and then add them to the imports array.
// https://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form
// https://stackoverflow.com/questions/53130244/cant-bind-to-formgroup-in-angular-7

    this.updateForm = formBuilder.group({
      firstname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      lastname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email:  ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      phone: ['', Validators.compose([Validators.minLength(3), Validators.required])]
      

    });
   }
   toggleSideMenu() {
    console.log("call toggleSideMenu ")
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  ngOnInit() {

    // this.userService.getUserProfile().subscribe(res => {
    //   console.log("----->userDetailSub="+res);
    //   this.userDetailSub = res;
    //   this.updateForm.get('firstname').setValue('some value');
    // });
  }
  ionViewWillEnter() {
    this.userDetail = this.userService.getUserProfile();
    this.userService.getUserProfile().subscribe(res => {
      console.log("Get user profile response="+res);
      console.log("----->userDetailSub="+res.firstname);
      console.log("----->userDetailSub="+res.lastname);
      this.updateForm.get('firstname').setValue( res.firstname);
      this.updateForm.get('lastname').setValue( res.lastname);
      this.updateForm.get('email').setValue( res.email);
      this.updateForm.get('phone').setValue( res.phone);
    });
    // this.userDetail = this.userService.getUserProfile();
    // this.userService.getUserProfile().subscribe(res => {
    //   console.log("Get user profile response="+res);
    
    // });

  }

  async updateProfile(){
    if (!this.updateForm.valid){
      console.log("no valid");
      console.log(this.updateForm.value);
      //this.presentAlert("invalid form");
    } else {
      console.log(this.updateForm.value);
     // console.log("itemId="+this.itemId);
      this.ionicComponentService.presentLoading();

      console.log("YES");
        await this.userService.updateUserProfile(
          this.updateForm.value.firstname, 
          this.updateForm.value.lastname,
          this.updateForm.value.phone,
          this.updateForm.value.email
        )
        .then(() => {
          this.ionicComponentService.presentToast("Profile updated",2000);
            this.ionicComponentService.dismissLoading();
            this.router.navigateByUrl('/side-menu/travel/tabs/tab1');
            //this.nav.setRoot('AfterLoginPage');
        }, (error) => { 
           var errorMessage: string = error.message;
           this.ionicComponentService.dismissLoading();
           this.ionicComponentService.presentAlert(errorMessage);
   
        });

    }    
  }
 async logout(){

  await this.userService.signoutUser()
  .then(() => {
    console.log("LOGOUT");
    this.ionicComponentService.presentTimeoutLoading(1000,true);
    this.ionicComponentService.presentToast("Logout",4000);
    this.router.navigateByUrl('/side-menu/login');
    //this.nav.setRoot('AfterLoginPage');
  }, (error) => { 
     var errorMessage: string = error.message;
     this.ionicComponentService.presentToast(errorMessage,4000);
     console.log("ERROR:"+errorMessage);

  });
 }
}

