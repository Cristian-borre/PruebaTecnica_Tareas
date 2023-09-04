import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar mensajes

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, public fb: FormBuilder, private router: Router) {
    // Define un formulario de registro con campos para nombre, apellido, email y contraseña  
    this.registerForm = this.fb.group({
      nombre: [""],
      apellido: [""],
      email: [""],
      password: [""]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // Verifica si el formulario es válido
    if (this.registerForm.valid) {
      const {nombre, apellido, email, password} = this.registerForm.value;
      // Llama al método de registro del servicio de autenticación
      this.authService.register(nombre, apellido, email, password).subscribe(
        (response: any) => {
          if (response.message) {
            // Si el registro es exitoso, inicia sesión automáticamente
            this.authService.login(email, password).subscribe(
              (response: any) => {
                if (response.message) {
                  // Muestra un mensaje de bienvenida y guarda el token en el localStorage
                  Swal.fire({
                    title: 'Bienvenido',
                    text: 'Usuario registrado exitosamente',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                  })
                  const token = response.Datos['token']
                  localStorage.setItem('token',token)
                  // Redirige al usuario a la página de inicio
                  this.router.navigate(['inicio']);
                } else {
                  // Muestra un mensaje de error si el inicio de sesion no fue exitoso
                  Swal.fire({
                    title: 'Error al iniciar sesion',
                    text: 'Lo sentimos ocurrio un error, vuelve a intentarlo',
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                  })
                }
              }
            )
          } else {
            // Muestra un mensaje de error si el registro no fue exitoso
            Swal.fire({
              title: 'Error',
              text: 'Ocurrio un error inesperado',
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
      // Muestra un mensaje de error si el formulario no es válido
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
