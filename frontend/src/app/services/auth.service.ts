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

  /**
   * Check if there is a token in the storage. If there is, check if it is expired. If it is, remove the token from the storage.
   */
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

  /**
   * return true if user is authenticated
   */
  isAuthenticated() {
    return this.authenticationState.value;
  }

  /**
   * return true if user is an admin.
   */
  isAdmin() {
    return this.admin;
  }

  isEventManager() {
    return this.loadProfile();
  }

  /**
   * call the registration api with the provided credentials.
   */
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

  /**
   * Call the login api wih the provided credentials. If successful, store the token and set the user.
   */
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

  /**
   * Log the user out by remove the token from the storage, removing the user id, and changing the authentication state to false.
   */
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

  /**
   * Save a user profile with the provided credentials.
   */
  saveProfile(credentials) {
    return this.http.put(this.url + 'user/profile/' + this.id, credentials, httpOptions).pipe(
    );
  }

  /**
   * Save a service with the given service data.
   */
  saveService(service) {
    service.userId = this.id;
    return this.http.put(this.url + 'user/service/' + service.id, service, httpOptions);
  }

  /**
   * Save an event with the given event data.
   */
  saveEvent(event) {
    event.userId = this.id;
    return this.http.put(this.url + 'user/event/' + event.id, event, httpOptions);
  }

  /**
   * Save a new service with the provided service data.
   */
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
    return this.http.delete(this.url + 'user/service/' + service.serviceId, httpOptions);
  }

  deleteEvent(event) {
    event.userId = this.id;
    console.log(event);
    return this.http.delete(this.url + 'user/event/' + event.eventId, httpOptions);
  }

  /**
   * Load services by loading the user profile.
   */
  loadServices(): Observable<User> {
    /*    return this.http.get<Service[]>(this.url + 'user/profile/get' + this.id, httpOptions).pipe(
          map((services: any[]) => services.map((service) => new Service().deserialize(service)))
        );*/
    return this.loadProfile();
  }

  /**
   * Load events by loading the user profile.
   */
  loadEvents(): Observable<User> {
    /*return this.http.get<Array<Service>>(this.url + 'user/profile/' + this.id, httpOptions).pipe(
      map(data => console.log(data))
    );*/
    return this.loadProfile();
  }

  /**
   * Load the private profile of the user identified by the stored user id.
   */
  loadProfile(): Observable<User> {
    return this.http.get<User>(this.url + 'user/profile/' + this.id, httpOptions).pipe(
      map(data => new User().deserialize(data))
    );
  }

  /**
   * Load the public profile of a user identified by the provided user id.
   */
  loadUser(userId): Observable<User> {
    return this.http.get<User>(this.url + 'user/profile/' + userId, httpOptions).pipe(
      map(data => new User().deserialize(data))
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


}
