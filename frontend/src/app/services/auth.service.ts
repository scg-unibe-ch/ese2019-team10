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
import {Event} from '../models/event.model';


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
      this.router.navigate(['/', 'home']).then();
      this.alertService.presentToast('You have logged out. See you soon!').then();
    });
  }



  saveProfile(credentials) {
    return this.http.put(this.url + 'user/profile/' + this.id, credentials, httpOptions).pipe(
    );
  }

  saveService(service) {
    service.userId = this.id;
    return this.http.put(this.url + 'user/service/' + service.id, service, httpOptions);
  }

  saveEvent(event) {
    event.userId = this.id;
    return this.http.put(this.url + 'user/event/' + event.id, event, httpOptions);
  }

  saveNewService(service) {
    service.userId = this.id;
    return this.http.post(this.url + 'user/service', service, httpOptions);
  }

  saveNewEvent(event) {
    event.userId = this.id;
    return this.http.post(this.url + 'user/event', event, httpOptions);
  }

  deleteService(service) {
    service.userId = this.id;
    console.log(service);
    return this.http.delete(this.url + 'user/service/', service);
  }

  deleteEvent(event) {
    event.userId = this.id;
    console.log(event);
    return this.http.delete(this.url + 'user/event/', event);
  }


  loadServices(): Observable<User> {
    /*    return this.http.get<Service[]>(this.url + 'user/profile/get' + this.id, httpOptions).pipe(
          map((services: any[]) => services.map((service) => new Service().deserialize(service)))
        );*/
    return this.loadProfile();
  }

  loadEvents(): Observable<User> {
    /*return this.http.get<Array<Service>>(this.url + 'user/profile/' + this.id, httpOptions).pipe(
      map(data => console.log(data))
    );*/
    return this.loadProfile();
  }

  loadProfile(): Observable<User> {
    return this.http.get<User>(this.url + 'user/profile/' + this.id, httpOptions).pipe(
      map(data => new User().deserialize(data[0]))
    );
  }

  loadUser(userId): Observable<User> {
    return this.http.get<User>(this.url + 'user/profile/' + userId, httpOptions).pipe(
      map(data => new User().deserialize(data[0]))
    );
  }

  loadEvent(eventId): Observable<Event> {
    return this.http.get<Event>(this.url + 'user/event/' + eventId, httpOptions).pipe(
      map(data => new Event().deserialize(data))
    );
  }

  loadService(serviceId): Observable<Service> {
    return this.http.get<Service>(this.url + 'user/service/' + serviceId, httpOptions).pipe(
      map(data => new Service().deserialize(data))
    );
  }

  bookService(service) {
    service.bookerId = this.id;
    // console.log(service);
    return this.http.post(this.url + 'user/booking', service, httpOptions);
  }


  search(searchObject) {
    return this.http.post(this.url + 'search', searchObject).pipe(
      // map((users: any[]) => users.map((user) => new User().deserialize(user)))
    );
  }


  isEventManager() {
    return this.loadProfile();
  }
}
