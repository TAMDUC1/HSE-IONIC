import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import { FormBuilder, FormGroup ,Validators } from '@angular/forms';

import { MenuController , NavController } from '@ionic/angular';
import { IonicComponentService } from '../../services/ionic-component.service';

import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {


  public forgotForm: FormGroup;

  constructor( 
    public userService: UserService,
    private navController: NavController,
    public menuCtrl: MenuController,
    public router: Router,
    private ionicComponentService: IonicComponentService,
    public  formBuilder: FormBuilder
  ) { 

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
  
    this.forgotForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
   
    });
  }

  ngOnInit() {
  }
  toggleSideMenu() {
    console.log("call toggleSideMenu ")
    this.ionicComponentService.sideMenu(); //Add this method to your button click function
  }
  resetPassword(){
    if (!this.forgotForm.valid){
        console.log("form is invalid = "+ this.forgotForm.value);
    } else {

      this.ionicComponentService.presentLoading();

      this.userService.resetPassword(this.forgotForm.value.username)
      .then((user) => {
          this.ionicComponentService.dismissLoading();
          this.ionicComponentService.presentAlert("We just sent you a reset link to your email");
         // this.nav.setRoot('LoginPage');
          this.router.navigateByUrl('/side-menu/login');
      }, (error) => {
        var errorMessage: string = error.message;
        this.ionicComponentService.dismissLoading();
        this.ionicComponentService.presentAlert(errorMessage);
      });
    }
  }
}
