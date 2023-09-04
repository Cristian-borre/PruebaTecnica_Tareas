import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  cards: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user_id');
    // Reemplaza con el token real
    if (typeof token === 'string' && typeof user === 'string' ) {
      this.authService.getCards(token, user).subscribe((data:any) => {
        this.cards = data.data;
      });
    } else {
      // Manejar el caso en que no se encuentre un token válido en el localStorage
      console.error('No se encontró un token válido en el localStorage.');
    }
  }

}
