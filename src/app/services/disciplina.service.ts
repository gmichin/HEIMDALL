import { DisciplinaModel } from './../models/disciplina.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { Observable, forkJoin, map } from 'rxjs';
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

  public criarDisciplina(materia: DisciplinaModel) {
    return this.http.post(url_config.url_disciplina, materia);
  }

  public atualizarDisciplina(materia: DisciplinaModel) {
    return this.http.patch(
      `${url_config.url_disciplina}/${materia.disciplina_id}`,
      materia
    );
  }

  public deletarDisciplina(materia: DisciplinaModel[]) {
    const arrReqs: Observable<any>[] = [];
    materia.forEach((r) => {
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
      `${url_config.url_disciplina}/by-course/${courseId}`
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
    this.router.navigate(['tela-novas-materias']);
  }

  public getDisciplinaToEdit(): { class: DisciplinaModel; valid: boolean } {
    const materia =
      this.sessionService.getSessionData<DisciplinaModel>('editClass');
    if (materia.valido) {
      sessionStorage.removeItem('editClass');
      return { valid: true, class: materia.retorno };
    }
    return { valid: false, class: {} as DisciplinaModel };
  }
}
