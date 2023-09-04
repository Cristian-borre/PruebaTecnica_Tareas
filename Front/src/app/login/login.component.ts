import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, public fb: FormBuilder, private router: Router) {
      // Inicializa el formulario de inicio de sesión
      this.loginForm = this.fb.group({
      username: [""],
      password: [""]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      console.log(username, password)
      // Llama al método de inicio de sesión del servicio de autenticación
      this.authService.login(username, password).subscribe(
        (response: any) => {
          // Muestra una notificación de bienvenida si el inicio de sesión fue exitoso
          if (response.message) {
            Swal.fire({
              title: 'Bienvenido',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            })
            // Almacena el token de usuario en el almacenamiento local
            const token = response.Datos['token']
            const id = response.Datos['user_id']
            localStorage.setItem('token',token)
            localStorage.setItem('user_id',id)
            // Redirige al usuario a la página de inicio
            this.router.navigate(['inicio']);
          } else {
            // Muestra un mensaje de error si el inicio de sesión falló
            Swal.fire({
              title: 'Error',
              text: response.error,
              icon: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            })
          }
        },
        (error) => {
          console.log('Error de API: ', error);
        }
      );
    } else {
      // Muestra un mensaje de error si los campos del formulario no son válidos
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      })
    }
  }
}
