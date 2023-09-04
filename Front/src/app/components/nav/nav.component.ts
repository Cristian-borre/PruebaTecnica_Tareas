import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private router: Router) {}

  Logout(){
    Swal.fire({
      title: 'Hasta luego',
      text: 'Que tengas un buen dia',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    })
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    this.router.navigate([''])
  }
}
