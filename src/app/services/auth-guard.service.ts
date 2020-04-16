import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService,
                private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            resolve =>
            {
                if (this.auth.isAuthenticated()) {
                    console.log("##### User Guard: auth = true");
                    resolve(true);
                }
                else {
                    console.log("##### User Guard: auth = false");
                    console.log('User is not logged in');
                    //this.router.navigate(['/login']);
                    this.router.navigate(['/side-menu/login-jwt'], {
                        queryParams: {
                            redirectUrl: state.url
                        }
                    });
                    // route with redirect http://gnomeontherun.com/2017/03/02/guards-and-login-redirects-in-angular/
                    //this.router.navigate(['/product-list'], { queryParams: { redirect: 3 }});
                    resolve(false);
                }

            });
    }
}
