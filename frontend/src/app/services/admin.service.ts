import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {User} from '../models/user.model';


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

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Approve a user identified by the id.
   */
  approveUser(userID) {
    return this.http.put(this.url + 'admin/approve/' + userID, {}, httpOptions);
  }

  /**
   * Get a list of all approved users.
   */
  getApprovedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'admin/approved').pipe(
      map((users) => users.map((user) => new User().deserialize(user)))
    );

  }

  /**
   * Get a list of all unapproved users.
   */
  getUnapprovedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'admin/to-approve').pipe(
      map((users: any[]) => users.map((user) => new User().deserialize(user)))
    );
  }

}
