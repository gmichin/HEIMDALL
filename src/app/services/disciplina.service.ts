import { DisciplinaModel } from './../models/disciplina.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { ProfessorModel } from '../models/professor.model';

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

  public criarDisciplina(disciplinas: DisciplinaModel) {
    return this.http.post(url_config.url_disciplina, disciplinas);
  }

  public atualizarDisciplina(disciplinas: DisciplinaModel) {
    return this.http.patch(
      `${url_config.url_disciplina}/${disciplinas.disciplina_id}`,
      disciplinas
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
      `${url_config.url_disciplina}/${courseId}`
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
}
