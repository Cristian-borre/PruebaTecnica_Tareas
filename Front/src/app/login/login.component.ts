import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any;

  // loginForm: FormGroup;

  constructor(private authService: AuthService, 
    public fb: FormBuilder) {
  }

  ngOnInit() {
    this.onResetForm();
  }

  onResetForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    console.log('validar :', this.loginForm.controls);

    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log('Username:', username);
      console.log('Password:', password);

      // Aquí puedes enviar los datos al servicio de autenticación
    } else {
      console.log('Formulario no válido. Asegúrate de llenar todos los campos.');
    }
    // this.authService.login(this.username, this.password).subscribe(
    //   (response: any) => {
    //     console.log(response)
    //     if(response.message){
    //       console.log('Inicio de sesión exitoso: ', response.message);
    //     }else{
    //       console.log('Error al iniciar sesión: ', response.error);
    //     }
    //   },
    //   (error) => {
    //     console.log('Error de api: ', error);
    //   }
    // );
  }
}
