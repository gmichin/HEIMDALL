import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { url_config } from '../url.config';
import { AlunoModel } from '../models/aluno.model';
import { ProfessorModel } from '../models/professor.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; senha: string }) {
    return this.http.post<{ access_token: string, isAdm: boolean, user: AlunoModel | ProfessorModel,  type: 'professor' | 'aluno'}>(url_config.url_login, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
