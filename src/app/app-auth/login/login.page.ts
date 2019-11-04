import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import { FormBuilder, FormGroup ,Validators } from '@angular/forms';

import { MenuController,NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { IonicComponentService } from '../../services/ionic-component.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../../../../node_modules/firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  redirectUrl: string;
//****** form validation ******//
public loginForm: FormGroup;
public redirectPath: any;
  constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private userService:  UserService,

    private ionicComponentService: IonicComponentService,

    //****** form validation ********//
    public  formBuilder: FormBuilder
  ) { 
    //this.catId = this.activatedRoute.snapshot.paramMap.get('catId');
   /// console.log("CatId="+this.catId);

    let EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  
    // this.registerForm = fb.group({
    //let Email_Val =     /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  
    // this.registerForm = fb.group({
    //       email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
    //       profileName: ['', Validators.compose([Validators.minLength(2), Validators.required])],


    //       phone: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    //       password: ['', Validators.compose([Validators.minLength(6), Validators.required])],

    // });
   // this.redirectPath = this.activatedRoute.snapshot.paramMap.get('redirectPath');

// Tips: If you can't bind to 'formGroup' since it isn't a known property of 'form'.
//  ******Don't forgot to import FormsModule and ReactiveFormsModule into your <page-name>.module.ts and then add them to the imports array.
// https://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form
// https://stackoverflow.com/questions/53130244/cant-bind-to-formgroup-in-angular-7

    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      password: ['', Validators.compose([Validators.required])]

    });
  }

  ngOnInit() {
    this.redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl');
   // const secondParam: string = this.route.snapshot.queryParamMap.get('secondParamKey');
    console.log("redirectUrl="+this.redirectUrl)
    //this.ionicComponentService.presentToast("Demo account: <br>username = bee@gmail.com  <br>password= 123456",15000)
  }
  toggleSideMenu() {
    console.log("call toggleSideMenu ")
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  submitFormTest(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
      //this.presentAlert("invalid form");
      console.log("invalid form")
    } else {
      console.log(this.loginForm.value);
      console.log("yes, ")
      //this.userService.loginUser()
    }
  }




  login(){

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
      //this.presentAlert("invalid form");
      console.log("invalid form")
    } else {
      this.ionicComponentService.presentLoading()
      console.log(this.loginForm.value);
      console.log("yes, ")
      this.userService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .then( authData => {
        console.log("Auth pass");
        this.ionicComponentService.dismissLoading()
        if(this.redirectUrl){
          this.router.navigateByUrl('/'+this.redirectUrl);
        }else{
          this.router.navigateByUrl('/profile');
        }

      }, error => {
        //var errorMessage: string = error.message;
        this.ionicComponentService.dismissLoading()
        console.log("Error:"+error.message);
        this.ionicComponentService.presentAlert(error.message)

      });
    }
}
  // async NEWloginUser(loginForm): Promise<void> {
  //   const loading = await this.loadingCtrl.create();
  //   try {
  //     loading.present();

  //     const email: string = loginForm.value.email;
  //     const password: string = loginForm.value.password;


  //     await this.userService.signupUser(email, password);

      
  //     //await loading.dismiss();
  //     this.router.navigateByUrl('/side-menu/travel/tabs/tab1');
  //   } catch (error) {
  //     await loading.dismiss();
  //     const alert = await this.alertCtrl.create({
  //       message: error.message,
  //       buttons: [
  //         {
  //           text: 'OK',
  //           role: 'cancel',
  //         },
  //       ],
  //     });
  //     alert.present();
  //   }
  // }

//   login(){
//     if (!this.loginForm.valid){
//         //this.presentAlert('Username password can not be blank')
//         console.log("error");
//     } else {
//       let loadingPopup = this.loadingCtrl.create({
//         spinner: 'crescent', 
//         content: ''
//       });
//       loadingPopup.present();

//       this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
//       .then( authData => {
//         console.log("Auth pass");
//         loadingPopup.dismiss();
//         this.navCtrl.setRoot('AfterLoginPage');
//       }, error => {
//         var errorMessage: string = error.message;
//         loadingPopup.dismiss().then( () => {
//             this.presentAlert(errorMessage)
//         });
//       });
//     }
// }

}
