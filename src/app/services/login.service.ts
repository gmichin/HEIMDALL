import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { AlunoModel } from '../models/aluno.model';
import { ProfessorModel } from '../models/professor.model';
import { url_config } from '../url.config';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  public login(
    email: string,
    senha: string
  ): Observable<AlunoModel | ProfessorModel | null> {
    return this.http.get<AlunoModel[]>(url_config.url_aluno).pipe(
      map((alunos) => {
        const selectedAluno = alunos.find(
          (aluno) => aluno.email === email && aluno.senha === senha
        );
        if (selectedAluno) {
          this.sessionService.setItem('user', selectedAluno);
          return selectedAluno;
        }
        return null;
      }),
      catchError(() => {
        return this.http.get<ProfessorModel[]>(url_config.url_professor).pipe(
          map((professores) => {
            const selectedProfessor = professores.find(
              (professor) =>
                professor.email === email && professor.senha === senha
            );
            if (selectedProfessor) {
              this.sessionService.setItem(
                'idInstituicao',
                selectedProfessor.registro
              );
              this.sessionService.setItem('user', selectedProfessor);
              return selectedProfessor;
            }
            throw 'Não encontrado na base de dados.';
          })
        );
      })
    );
  }
}
