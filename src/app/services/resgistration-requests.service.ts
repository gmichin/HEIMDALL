import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { url_config } from '../url.config';
import { Observable } from 'rxjs';
import { AlunoModel } from '../models/aluno.model';
import { ProfessorModel } from '../models/professor.model';

@Injectable({
  providedIn: 'root',
})
export class ResgistrationRequestsService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _sessionService: SessionService
  ) {}
  public sendResquestResponsAluno(
    reqs: AlunoModel[]
  ): Observable<AlunoModel[]> {
    return this._http.post<AlunoModel[]>(
      `${url_config.url_validacao}/validate`,
      reqs
    );
  }
  public sendResquestResponsProfessor(
    reqs: ProfessorModel[]
  ): Observable<ProfessorModel[]> {
    return this._http.post<ProfessorModel[]>(
      `${url_config.url_validacao}/validate`,
      reqs
    );
  }
}
