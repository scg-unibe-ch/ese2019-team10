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

@Injectable({
  providedIn: 'root'
})

export class HttpErrorService implements HttpInterceptor {

  constructor(
    private alertController: AlertController) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            this.showAlert('Error', error.error.message);
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            this.showAlert('Error Code: ' + error.status, error.message);
          }
          return throwError(errorMessage);
        })
      );
  }

  showAlert(hdr, msg) {
    const alert = this.alertController.create({
      message: msg,
      header: hdr,
      buttons: ['OK']
    });
    alert.then(a => a.present());
  }
}
