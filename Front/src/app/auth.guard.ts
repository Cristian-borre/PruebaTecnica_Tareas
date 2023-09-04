import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {

    // Verifica si hay un token en el localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Si hay un token, permite la navegación
      return true;
    } else {
      // Si no hay un token, redirige al usuario a la página del login
      this.router.navigate(['']);
      return false;
    }

  }

}