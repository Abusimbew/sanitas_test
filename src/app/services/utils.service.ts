import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public toastController: ToastController) { }

  // Muestra un toast con el mensaje y el tipo pasados por parametro
  async showToast(message: string, type: string = 'danger', cssClassP: string = 'mainToast', durationP: number = 2500): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      buttons: [
        {
          text: 'X',
          role: 'cancel'
        }
      ],
      color: type,
      duration: durationP,
      cssClass: cssClassP
    });
    await toast.present();
  }
}
