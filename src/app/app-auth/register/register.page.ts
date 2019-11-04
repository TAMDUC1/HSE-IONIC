import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import { FormBuilder, FormGroup ,Validators } from '@angular/forms';

import { MenuController,NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

import { UserService } from '../../services/user.service';
import { IonicComponentService } from '../../services/ionic-component.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../../../../node_modules/firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;
  
  constructor(
  
    private router: Router,
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
  
  
  // Tips: If you can't bind to 'formGroup' since it isn't a known property of 'form'.
  //  ******Don't forgot to import FormsModule and ReactiveFormsModule into your <page-name>.module.ts and then add them to the imports array.
  // https://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form
  // https://stackoverflow.com/questions/53130244/cant-bind-to-formgroup-in-angular-7
  
    this.registerForm = formBuilder.group({
      firstname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      lastname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      phone: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      username:  ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password:  ['', Validators.compose([Validators.minLength(6), Validators.required])],
  //['', Validators.compose([Validators.required])]
    });
  }
  
  ngOnInit() {
  }
  toggleSideMenu() {
    console.log("call toggleSideMenu ")
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  submitFormTest(){
    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
      //this.presentAlert("invalid form");
      console.log("invalid form")
    } else {
      console.log(this.registerForm.value);
      console.log("yes, ")
      //this.userService.loginUser()
    }
  }
  /// old way ////
  async registerUser(){
    console.log("call signopUser");
    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
      console.log("invalid form")
      //this.presentAlert("invalid form");
    } else {
      this.ionicComponentService.presentLoading();
      console.log(this.registerForm.value);
      console.log("yes, ")
      await this.userService.signupUser(
        this.registerForm.value.firstname, 
        this.registerForm.value.lastname,
        this.registerForm.value.phone,
        this.registerForm.value.username, 
        this.registerForm.value.password
      )
      .then(() => {
        this.ionicComponentService.dismissLoading();
          this.router.navigateByUrl('/side-menu/travel/tabs/tab1');
          //loadingPopup.dismiss();
          //this.nav.setRoot('AfterLoginPage');
      }, (error) => { 
       
         var errorMessage: string = error.message;
         this.ionicComponentService.dismissLoading();
         this.ionicComponentService.presentAlert(errorMessage);      
      });
  
    }
  }
  //// new way ////
  // async signupUser(signupForm): Promise<void> {
  //   const loading = await this.loadingCtrl.create();
  //   try {
  //     loading.present();
  
  //     const email: string = signupForm.value.email;
  //     const password: string = signupForm.value.password;

  
  //     await loading.dismiss();
      
 
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
  }
  