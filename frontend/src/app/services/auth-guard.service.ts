import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

import {AuthService} from './auth.service';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    const authInfo = this.authService.isAuthenticated();

    if (!authInfo) {
      this.router.navigate(['login']).then(r => {
      });
      this.alertService.presentToast('You need to log in to do this.').then(r => {
        console.log(r);
      }, err => {
        console.log(err);
      });
    }

    return authInfo;
  }

}
