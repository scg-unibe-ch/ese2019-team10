import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import {AlertController} from '@ionic/angular';

import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService implements HttpInterceptor {

  constructor(
    private alertController: AlertController,
  ) {
  }

  /**
   * Intercept http events and catch errors to handle them in one place, namely here.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        // don't retry
        retry(0),

        catchError((error: HttpErrorResponse) => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = 'Error: ${error.error.message}';
            this.showAlert('Error', error.error.message);
          } else {
            // server-side error
            console.log(error.error);
            errorMessage = 'Error Code: ${error.status}\nMessage: ${error.statusText}';
            // return these errors instead of show an alert
            if (error.status === 401 &&
              (error.statusText.includes('username/password') || error.statusText.includes('not approved'))) {
              // this.alertService.presentToast(error.statusText).then();
              return throwError(error.statusText);
            } else if (error.status === 401 &&
              (error.error.msg.includes('username/password') || error.error.msg.includes('not approved'))) {
              // this.alertService.presentToast(error.statusText).then();
              return throwError(error.error.msg);
            } else {
              // show an alert for all other errors
              this.showAlert('Error Code: ' + error.status, error.message);
            }
          }
          return throwError(errorMessage);
        })
      );
  }

  /**
   * Display the error in an alert with a header and a message and an OK button.
   */
  showAlert(hdr, msg) {
    const alert = this.alertController.create({
      message: msg,
      header: hdr,
      buttons: ['OK']
    });
    alert.then(a => a.present());
  }
}
