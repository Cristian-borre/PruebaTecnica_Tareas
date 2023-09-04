import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() estado: string = '';
  @Input() card_id: string = '';

  constructor(private authService: AuthService) { }

  onUpdate(card_id: string) {

    Swal.fire({
      title: 'Buen trabajo',
      text: "Buen trabajo, tarea completada",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    }).then((result) => {
      const token = localStorage.getItem('token')
      const id = parseInt(card_id)
      const estado = true
      if (typeof token === 'string') {
        this.authService.updateTarea(token, id, estado).subscribe(
          (response: any) => {
            if (response.message) {
              window.location.reload()
            } else {
              Swal.fire({
                title: 'Lo sentimos algo ocurrio',
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              })
            }
          }, 
          (error) => {
            Swal.fire({
              title: 'Lo sentimos algo ocurrio',
              icon: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          })
      }
    })
  }
}
