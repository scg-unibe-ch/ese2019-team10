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
import {retry, catchError, map} from 'rxjs/operators';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorService implements HttpInterceptor {


  constructor(
    private alertController: AlertController,
    private alertService: AlertService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(0),
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
            // this.errorDialogService.openDialog(event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            this.showAlert('Error', error.error.message);
          } else {
            // server-side error
            console.log(error.error);
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText}`;
            if (error.status === 401 && (error.statusText === 'Wrong username/password combination.' || error.statusText === 'Account is not approved yet.')) {
              // this.alertService.presentToast(error.statusText).then();
              return throwError(error.statusText);
            } else {
              this.showAlert('Error Code: ' + error.status, error.message);
            }
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
