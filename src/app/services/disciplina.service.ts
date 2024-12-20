import { DisciplinaModel } from './../models/disciplina.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import {
  IProfessoresByDisciplina,
  ProfessorModel,
} from '../models/professor.model';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) {}

  public getAllDisciplinas(): Observable<DisciplinaModel[]> {
    const url = `${url_config.url_disciplina}`;
    return this.http.get<DisciplinaModel[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  public getDisciplinaPorId(turma: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${url_config.url_disciplina}/${turma.disciplina.disciplina_id}`
    );
  }

  public criarDisciplina(disciplinas: DisciplinaModel) {
    return this.http.post(url_config.url_disciplina, disciplinas);
  }

  public atualizarDisciplina(disciplinas: DisciplinaModel) {
    const disciplina = {
      nome: disciplinas.nome,
      descricao: disciplinas.descricao,
      curso: disciplinas.curso_id,
    };
    return this.http.patch(
      `${url_config.url_disciplina}/${disciplinas.disciplina_id}`,
      disciplina
    );
  }

  public deletarDisciplina(disciplinas: DisciplinaModel[]) {
    const arrReqs: Observable<any>[] = [];
    disciplinas.forEach((r) => {
      arrReqs.push(
        this.http.delete(`${url_config.url_disciplina}/${r.disciplina_id}`)
      );
    });

    return forkJoin(...arrReqs);
  }

  public getDisciplinaPorCurso(
    courseId: string
  ): Observable<DisciplinaModel[]> {
    return this.http.get<DisciplinaModel[]>(
      `${url_config.url_disciplina}/curso/${courseId}`
    );
  }

  public salvarDisciplinaToEdit(disciplina: DisciplinaModel) {
    this.sessionService.setItem('editDisciplina', disciplina);
    this.router.navigate(['tela-novas-disciplinas']);
  }

  public getDisciplinaToEdit(): {
    disciplina: DisciplinaModel;
    valid: boolean;
  } {
    const disciplinas =
      this.sessionService.getSessionData<DisciplinaModel>('editDisciplina');
    if (disciplinas.valido) {
      sessionStorage.removeItem('editDisciplina');
      return { valid: true, disciplina: disciplinas.retorno };
    }
    return { valid: false, disciplina: {} as DisciplinaModel };
  }

  public getProfessorPorDisciplina(
    disciplinaId: string
  ): Observable<IProfessoresByDisciplina> {
    return this.http.get<IProfessoresByDisciplina>(
      `${url_config.url_turma}/disciplina/${disciplinaId}/professores`
    );
  }
}
