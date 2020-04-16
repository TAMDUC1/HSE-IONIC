import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {MenuController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-jwt',
  templateUrl: './login-jwt.page.html',
  styleUrls: ['./login-jwt.page.scss'],
})
export class LoginJwtPage implements OnInit {
    credentialsForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public menuCtrl: MenuController,
        private authService: AuthService) { }

    ngOnInit() {
        this.credentialsForm = this.formBuilder.group({
            Username: ['', [Validators.required, Validators.email]],
            PasswordMobile: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    onSubmit() {
        console.log('this.credentialsForm.value',this.credentialsForm.value);
        this.authService.login(this.credentialsForm.value).subscribe();
    }
    toggleSideMenu() {
        console.log("call toggleSideMenu ");
        this.menuCtrl.toggle(); //Add this method to your button click function
    }
    register() {
        this.authService.register(this.credentialsForm.value).subscribe(res => {
            // Call Login to automatically login the new user
            this.authService.login(this.credentialsForm.value).subscribe();
        });
    }
    logOut(){
        this.authService.logout();
    }

}
