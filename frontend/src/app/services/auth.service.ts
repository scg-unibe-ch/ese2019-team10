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
import {Service} from '../models/service.model';

const TOKEN_KEY = 'access_token';
const ID_KEY = 'user_id';
const ADMIN_KEY = 'is_admin';


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
  private admin = false;

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
          this.storage.get(ADMIN_KEY).then(bool => {
            this.admin = bool;
          });
        } else {
          this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
            this.storage.remove(ID_KEY).then(() => {
              this.id = null;
            });
            this.storage.remove(ADMIN_KEY).then(() => {
              this.admin = false;
            });
          });
        }
      }
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  isAdmin() {
    return this.admin;
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
              this.id = res.userId;
            });
            this.storage.set(ADMIN_KEY, res.isAdmin).then(() => {
              this.admin = res.isAdmin;
            });
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
      this.storage.remove(ID_KEY).then(() => {
        this.id = null;
      });
      this.storage.remove(ADMIN_KEY).then(() => {
        this.admin = false;
      });
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
    return this.http.get<User>(this.url + 'user/profile/' + this.id, httpOptions).pipe(
      map(data => new User().deserialize(data[0]))
    );
    /*    .pipe(
          catchError(e => {
            this.showAlert(e.error.msg);
            throw new Error(e);
          })
        );*/
  }

  saveProfile(credentials) {
    return this.http.put(this.url + 'user/profile/' + this.id, credentials, httpOptions).pipe(
      /*      catchError(e => {
              this.showAlert(e.error.msg);
              throw new Error(e);
            })*/
    );
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.url + 'user/profile/' + this.id, httpOptions).pipe(
      map(data => new User().deserialize(data))
    );
  }


  loadServices(): Observable<User> {
    /*    return this.http.get<Service[]>(this.url + 'user/profile/get' + this.id, httpOptions).pipe(
          map((services: any[]) => services.map((service) => new Service().deserialize(service)))
        );*/
    return this.loadProfile();
  }

  saveService(service) {
    service.userId = this.id;
    console.log(service);
    return this.http.put(this.url + 'user/service/', service, httpOptions);
    /*      .pipe(
          map(data => console.log(data))
        );*/
  }

  saveNewService(service) {
    service.userId = this.id;
    console.log(service);
    return this.http.post(this.url + 'user/service', service, httpOptions);
    /*    .pipe(
          map(data => console.log(data))
        );*/
  }

  deleteService(id): Observable<void> {
    return this.http.delete(this.url + 'user/service/' + id, httpOptions).pipe(
      map(data => console.log(data))
    );
  }

  loadEvents(): Observable<User> {
    /*return this.http.get<Array<Service>>(this.url + 'user/profile/' + this.id, httpOptions).pipe(
      map(data => console.log(data))
    );*/
    return this.loadProfile();
  }

  saveEvent(event) {
    event.userId = this.id;
    // console.log(event);
    return this.http.put(this.url + 'user/event/', event, httpOptions);
    /*      .pipe(
          map(data => console.log(data))
        );*/
  }

  saveNewEvent(event) {
    event.userId = this.id;
    // console.log(event);
    return this.http.post(this.url + 'user/event', event, httpOptions);
    /*    .pipe(
          map(data => console.log(data))
        );*/
  }

  deleteEvent(id): Observable<void> {
    return this.http.delete(this.url + 'user/event/' + id, httpOptions).pipe(
      map(data => console.log(data))
    );
  }

  search(term) {
    return this.http.get(this.url + 'search', term).pipe(
      // map((users: any[]) => users.map((user) => new User().deserialize(user)))
    );
  }


  /*  showAlert(msg) {
      const alert = this.alertController.create({
        message: msg,
        header: 'Error',
        buttons: ['OK']
      });
      alert.then(a => a.present());
    }*/

}
