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
    private authService: AuthService
  ) {}
  public login(
    email: string,
    senha: string
  ): Observable<{
    user: AlunoModel | ProfessorModel;
    tipo: 'aluno' | 'professor' | 'adm';
  } | null> {
    return this.authService.login({ email, senha }).pipe(
      map((res) => {
        this.sessionService.setItem(res.type, res.user);
        return { user: res.user, tipo: res.type };
      })
    );
  }
  /* public login(
    email: string,
    senha: string
  ): Observable<{
    user: AlunoModel | ProfessorModel;
    tipo: 'aluno' | 'professor' | 'adm';
  } | null> {
    return this.http.get<AlunoModel[]>(url_config.url_aluno).pipe(
      map((alunos) => {
        const selectedAluno = alunos.find(
          (aluno) => aluno.email === email && aluno.senha === senha
        );
        if (selectedAluno) {
          this.sessionService.setItem('aluno', selectedAluno);
          return { user: selectedAluno, tipo: 'aluno' as const };
        }
        return null;
      }),
      catchError(() => of(null)),
      switchMap((result) => {
        if (result) {
          return of(result);
        } else {
          return this.http.get<ProfessorModel[]>(url_config.url_professor).pipe(
            map((professores) => {
              const selectedProfessor = professores.find(
                (professor) =>
                  professor.email === email && professor.senha === senha
              );
              if (selectedProfessor && selectedProfessor.adm == false) {
                this.sessionService.setItem('professor', selectedProfessor);
                return { user: selectedProfessor, tipo: 'professor' as const };
              } else if (selectedProfessor && selectedProfessor.adm == true) {
                this.sessionService.setItem('adm', selectedProfessor);
                return { user: selectedProfessor, tipo: 'adm' as const };
              }
              return null;
            })
          );
        }
      })
    );
  } */
}
