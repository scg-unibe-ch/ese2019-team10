import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  constructor(private toastController: ToastController) {
  }

  /**
   * Display a toast message using the settings defined below.
   */
  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'dark',
      animated: true,
    });
    await toast.present();
  }
}
