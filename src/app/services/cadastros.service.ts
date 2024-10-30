import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AlunoModel } from '../models/aluno.model';
import { ProfessorModel } from '../models/professor.model';
import { url_config } from '../url.config';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  atualizarProfessor(request: ProfessorModel) {
    let userType: string;
    userType = 'professor';

    return this.http
      .patch<ProfessorModel>(
        `${url_config.url_professor}/${request.professor_id}`,
        request
      )
      .pipe(
        map((resp) => {
          this.sessionService.setItem(userType, resp);
        })
      );
  }

  atualizarAluno(request: AlunoModel) {
    let userType: string;
    userType = 'aluno';

    return this.http
      .patch<AlunoModel>(`${url_config.url_aluno}/${request.aluno_id}`, request)
      .pipe(
        map((resp) => {
          this.sessionService.setItem(userType, resp);
        })
      );
  }

  cadastroAluno(request: AlunoModel) {
    return this.http.post(url_config.url_aluno, request);
  }
  cadastroProfessorAdm(request: ProfessorModel) {
    return this.http.post(url_config.url_professor, request);
  }
}
