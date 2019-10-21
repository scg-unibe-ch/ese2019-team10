import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        const decoded = this.helper.decodeToken(token);
        const isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
          });
        }
      }
    });
  }

  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials);
  }

  saveProfile(credentials) {
    return this.http.post(`${this.url}/api/profile`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  login(credentials) {
    return this.http.post(`${this.url}/api/login`, credentials)
      .pipe(
        tap((res: any) => {
          this.storage.set(TOKEN_KEY, res.token).then(() => {
            this.user = this.helper.decodeToken(res.token);
            this.authenticationState.next(true);
          });
        }),
/*        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })*/
      );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  getApprovedUsers() {
    return this.http.get(`${this.url}/api/register/approved`);
/*
    .pipe(
      catchError(e => {
        const status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          // this.logout();
        }
        throw new Error(e);
      })
    );*/
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  showAlert(msg) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(a => a.present());
  }
}
