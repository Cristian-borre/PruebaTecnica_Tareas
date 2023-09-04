import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  TaskForm: FormGroup;

  constructor(private authService: AuthService, public fb: FormBuilder, private router: Router) {
      this.TaskForm = this.fb.group({
      titulo: [""],
      descripcion: [""]
    });
  }

  onSubmit() {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user_id')
    if (this.TaskForm.valid) {
      const {titulo, descripcion} = this.TaskForm.value;
      if (typeof token === 'string' && typeof user === 'string') {
        this.authService.tareas(user, titulo, descripcion, token).subscribe(
          (response: any) => {
            if (response.message) {
              Swal.fire({
                title: 'Buen trabajo',
                text: 'Se creo la tarea correctamente',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              })
              window.location.reload();
            } else {
              Swal.fire({
                title: 'Ocurrio un error',
                text: 'Lo sentimos vuelve a intentarlo',
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
      }
    } else {
      Swal.fire({
        title: 'Ocurrio un error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      })
    }
  }

  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
