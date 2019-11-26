import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {Platform, AlertController} from '@ionic/angular';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Storage} from '@ionic/storage';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController) {
  }

  /**
   * Intercept http requests and inject the JWT token for authentication (if there is one).
   */
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = this.storage.get(TOKEN_KEY);

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
