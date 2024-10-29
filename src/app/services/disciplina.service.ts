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

  public getProfessorPorDisciplina(
    classId: string
  ): Observable<ProfessorModel[]> {
    return this.http
      .get<ProfessorModel[]>(`${url_config.url_disciplina}/teachers/${classId}`)
      .pipe(
        map((teachers) => {
          const user =
            this.sessionService.getSessionData<ProfessorModel>('user').retorno;
          if (user) {
            return teachers.filter((t) => t.professor_id == user.professor_id);
          }
          return teachers;
        })
      );
  }

  public salvarDisciplinaToEdit(matria: DisciplinaModel) {
    this.sessionService.setItem('editClass', matria);
    this.router.navigate(['tela-novas-disciplinas']);
  }

  public getDisciplinaToEdit(): { class: DisciplinaModel; valid: boolean } {
    const disciplinas =
      this.sessionService.getSessionData<DisciplinaModel>('editClass');
    if (disciplinas.valido) {
      sessionStorage.removeItem('editClass');
      return { valid: true, class: disciplinas.retorno };
    }
    return { valid: false, class: {} as DisciplinaModel };
  }
}
