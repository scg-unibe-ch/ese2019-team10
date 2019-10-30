import {Injectable} from '@angular/core';
import {Platform, AlertController} from '@ionic/angular';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Storage} from '@ionic/storage';
import {tap, catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';

const TOKEN_KEY = 'access_token';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

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
    private alertController: AlertController,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
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
    return this.http.post(this.url + 'register', credentials);
  }

  login(credentials): Observable<any> {
    return this.http.post(this.url + 'login', credentials, httpOptions)
      .pipe(
        tap((res: any) => {
          this.storage.set(TOKEN_KEY, res.token).then(() => {
            this.user = this.helper.decodeToken(res.idToken);
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
      this.router.navigate(['/', 'home']).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err); // when there's an error
      });
      this.alertService.presentToast('You have logged out. See you soon!').then(r => {
        console.log(r);
      }, err => {
        console.log(err);
      });
    });
  }

  loadProfile(): Observable<User> {
    return this.http.get<User>(this.url + 'profile').pipe(
      tap((res: User) => console.log(res))
    );
    /*    .pipe(
          catchError(e => {
            this.showAlert(e.error.msg);
            throw new Error(e);
          })
        );*/
  }

  saveProfile(credentials) {
    return this.http.post(this.url + 'profile', credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
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
