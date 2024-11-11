import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { AlunoModel } from '../models/aluno.model';
import { ProfessorModel } from '../models/professor.model';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private authService: AuthService,
  ) {}
  public login(
    email: string,
    senha: string
  ): Observable<{
    user: AlunoModel | ProfessorModel;
    tipo: 'aluno' | 'professor' | 'adm';
  } | null> {
    return this.authService.login({email,senha}).pipe(
      map(res => {
        this.sessionService.setItem(res.type, res.user);
        return { user: res.user, tipo: res.type};
      }),
    )
  }
}
