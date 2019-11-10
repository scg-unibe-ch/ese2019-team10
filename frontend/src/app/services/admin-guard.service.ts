import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from './auth.service';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['dashboard'], {queryParams: {returnUrl: state.url}}).then(r => {
        this.alertService.presentToast('You do not have the necessary authorization.').then();
      });
      return false;
    }

  }

}
