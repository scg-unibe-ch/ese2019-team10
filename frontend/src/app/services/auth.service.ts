import {Injectable} from '@angular/core';
import {Platform, AlertController} from '@ionic/angular';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Storage} from '@ionic/storage';
import {tap, catchError, map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';

const TOKEN_KEY = 'access_token';
const ID_KEY = 'user_id';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public url = environment.url;
  public user = null;
  public authenticationState = new BehaviorSubject(false);
  private id = null;

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

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        const decoded = this.helper.decodeToken(token);
        const isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
          this.storage.get(ID_KEY).then(id => {
            this.id = id;
          });
        } else {
          this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
            this.storage.remove(ID_KEY).then(() => {
              this.id = null;
            });
          });
        }
      }
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  register(credentials) {
    return this.http.post(this.url + 'register', credentials, httpOptions)
      .pipe(
        tap(),
        /*        catchError(e => {
                  const status = e.status;
                  if (status === 401) {
                    this.alertService.presentToast(e.msg).then();
                  }
                  throw new Error(e);
                })*/
      );
  }

  login(credentials): Observable<any> {
    return this.http.post(this.url + 'login', credentials, httpOptions)
      .pipe(
        tap((res: any) => {
          this.storage.set(TOKEN_KEY, res.idToken).then(() => {
            this.user = this.helper.decodeToken(res.idToken);
            this.storage.set(ID_KEY, res.userId).then(() => {
            });
            this.id = res.userId;
            this.authenticationState.next(true);
          });
        }),
        catchError(e => {
          /*          const status = e.status;
                    if (status === 401) {
                      this.alertService.presentToast(e.msg).then();
                    }*/
          throw new Error(e);
        })
      );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.router.navigate(['/', 'home']).then(/*nav => {}, err => {
        console.log(err); // when there's an error
      }*/);
      this.alertService.presentToast('You have logged out. See you soon!').then(/*r => {
        console.log(r);
      }, err => {
        console.log(err);
      }*/);
    });
  }

  loadProfile(): Observable<User> {
    return this.http.get<User>(this.url + 'user/profile/' + this.id).pipe(
      map(data => new User().deserialize(data))
    );
    /*    .pipe(
          catchError(e => {
            this.showAlert(e.error.msg);
            throw new Error(e);
          })
        );*/
  }

  saveProfile(credentials) {
    return this.http.post(this.url + 'profile/save', credentials, httpOptions).pipe(
      /*      catchError(e => {
              this.showAlert(e.error.msg);
              throw new Error(e);
            })*/
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
