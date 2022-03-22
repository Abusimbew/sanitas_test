import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../services/utils.service';

// Interfaz de usuario
declare interface User {
  email: string,
  password: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private REMEMBER_KEY: string;

  private toastMessage: string;

  loginForm: FormGroup;

  isShowSpinner: boolean;
  isToggleChecked: boolean;

  user: User = {
    email: '',
    password: ''
  }

  constructor(private utils: UtilsService) {
    this.createForm();
    this.REMEMBER_KEY = environment.REMEMBER_LOGIN_KEY;
  }

  ionViewWillEnter() {
    this.isShowSpinner = false;
    this.toastMessage = '';
    // Recuperar objeto parseado a string de localStorage.getItem
    if (localStorage.getItem(this.REMEMBER_KEY)) {
      this.isToggleChecked = true;
      this.user.email = JSON.parse(localStorage.getItem(this.REMEMBER_KEY)).email;
      this.user.password = JSON.parse(localStorage.getItem(this.REMEMBER_KEY)).password;
    } else {
      this.isToggleChecked = false;
      this.user.email = '';
      this.user.password = '';
    }
  }

  createForm(): void {
    // FormGroup para validar inputs email y password en el html
    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  onChangeToggle() {
    console.log('toggle', this.isToggleChecked)
    // Comprueba si los valores son validos y está el toggle en checked
    if (this.isToggleChecked && !this.validateInputs()) this.utils.showToast('No se pueden recordar estos valores');
    else if (this.validateInputs()) this.saveData();
  }

  loginOnClick(): void {
    if (this.validateInputs()) {
      this.saveData();
      this.loginSuccess();
    } else this.utils.showToast(this.toastMessage);
  }

  saveData() {
    if (this.isToggleChecked) {
      // Almacena objeto parseado a string en localStorage
      localStorage.setItem(this.REMEMBER_KEY, JSON.stringify(this.user));
    } else if (localStorage.getItem(this.REMEMBER_KEY)) localStorage.removeItem(this.REMEMBER_KEY);
  }

  // Comprueba las validaciones de los input
  validateInputs(): boolean {
    let isOk: boolean = false;
    switch (true) {
      case this.loginForm.get('email').hasError('required'):
        this.toastMessage = 'Email requerido';
        break;
      case this.loginForm.get('email').hasError('email'):
        this.toastMessage = 'Email mal formado';
        break;
      case this.loginForm.get('password').hasError('required'):
        this.toastMessage = 'Contraseña requerida';
        break;
      case this.loginForm.get('password').hasError('minlength'):
        this.toastMessage = 'Contraseña insuficiente';
        break;
      default:
        isOk = true;
        break;
    }
    return isOk;
  }

  loginSuccess(): void {
    console.log('OK');
    this.isShowSpinner = true;
    setTimeout(() => {
      this.isShowSpinner = false;
      this.utils.showToast('¡Enhorabuena!', 'success', 'animationToast', 4000);
    }, 3000);
  }

}