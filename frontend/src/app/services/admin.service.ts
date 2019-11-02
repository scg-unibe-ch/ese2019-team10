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
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
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
  }


  approveUser(userID) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.put(this.url + 'admin/approve/' + userID,
      {},
      {headers});
  }

  getApprovedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'admin/approved').pipe(
      map((users) => users.map((user) => new User().deserialize(user)))
    );
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

  getUnapprovedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'admin/to-approve').pipe(
      map((users: any[]) => users.map((user) => new User().deserialize(user)))
    );
  }

}
