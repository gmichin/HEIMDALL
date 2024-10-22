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

  atualizarUsuário(request: AlunoModel | ProfessorModel) {
    let id: number | undefined;
    let userType: string;

    if (request instanceof AlunoModel) {
      id = request.aluno_id;
      userType = 'aluno';
    } else if (request instanceof ProfessorModel) {
      id = request.professor_id;
      userType = 'professor';
    }

    const url = id
      ? `${
          request instanceof AlunoModel
            ? url_config.url_aluno
            : url_config.url_professor
        }/${id}`
      : ''; // Gera a URL correta

    return this.http.patch<AlunoModel | ProfessorModel>(url, request).pipe(
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
