
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Enpoints
  private UrlLogin = 'http://127.0.0.1:8000/api-token-auth';
  private UrlResgister = 'http://127.0.0.1:8000/api/create-usuario/';
  private UrlTareas = `http://127.0.0.1:8000/api/tareas/`

  // BehaviorSubject para almacenar y emitir datos del usuario autenticado
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.post(this.UrlLogin, body, options);
  }

  // Método para registrar un nuevo usuario
  register(nombre: string, apellido: string, email: string, password: string): Observable<any> {
    const body = { nombre: nombre, apellido: apellido, email: email, password: password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.post(this.UrlResgister, body, options);
  }

  // Método para obtener las tareas de un usuario
  getCards(token: string, user: string): Observable<any[]> {
    const UrlTareas = this.UrlTareas
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get<any[]>(UrlTareas, { headers });
  }

  // Método para crear una nueva tarea
  tareas(user: string, titulo: string, descripcion: string, token: string): Observable<any> {
    const UrlTareas = this.UrlTareas
    const body = { usuario_id: user, titulo: titulo, descripcion: descripcion };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
    const options = { headers: headers };
    return this.http.post(UrlTareas, body, options);
  }

  // Método para actualizar el estado de una tarea
  updateTarea(token: string, id: number, nuevoEstado: boolean): Observable<any> {
    const UrlTareas = `${this.UrlTareas}${id}/`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
    const estadoActualizado = { completed: nuevoEstado };
    const options = { headers: headers };
    return this.http.put(UrlTareas, estadoActualizado, options);
  }
}