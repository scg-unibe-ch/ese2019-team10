import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

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

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}}).then(r => {
        this.alertService.presentToast('You need to log in to do this.').then();
      });
      return false;
    }

  }

}
