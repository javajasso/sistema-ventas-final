import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../../../shared/models/usuarios.interface';
import { environment } from '../../../../environments/environment.development';
import { Rol } from '../../../shared/models/roles.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) { }
  
  listarUsuarios() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.API_URL}/usuarios`, { headers: {"requireToken" : "true"}})
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  listarRoles() : Observable<Rol[]> {
    return this.http.get<Rol[]>(`${environment.API_URL}/general/roles`, { headers: {"requireToken" : "true"}})
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  insertarUsuario(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.API_URL}/usuarios`, user, { headers: {"requireToken" : "true"}})
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  actualizarUsuario(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.API_URL}/usuarios`, user, { headers: {"requireToken" : "true"}})
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  eliminarUsuario(cveUsuario: number) {
    return this.http.delete<Usuario>(`${environment.API_URL}/usuarios/${cveUsuario}`, { headers: {"requireToken" : "true"}})
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  // private handlerError(error: any) {
  //   console.log(error);
  //   var message = "Ocurrió un error";
  //   if (error.error) {
  //     if (error.error.message) message = error.error.message;
  //     else message = 'Ocurrió un error';
  //   }

  //   this.snackBar.open(message, '', {
  //     duration: 3000
  //   });

  //   return throwError(() => new Error(message));
  // }

  private readonly JWT_MISSING_MESSAGE = 'JWT token must be provided';
  private readonly GENERIC_ERROR_MESSAGE = 'Ocurrió un error';

  private handlerError(error: any) {
    console.error('Error:', error);

    let message = this.GENERIC_ERROR_MESSAGE;

    if (error.error) {
      if (error.error.message) {
        // Manejo de mensajes específicos de JWT
        if (error.error.message.includes('JWT token must be provided')) {
          message = this.JWT_MISSING_MESSAGE;
        } else {
          message = error.error.message;
        }
      } else {
        message = this.GENERIC_ERROR_MESSAGE;
      }
    }

    this.snackBar.open(message, '', {
      duration: 3000
    });

    return throwError(() => new Error(message));
  }
}
