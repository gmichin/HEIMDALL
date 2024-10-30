import { CursoModel } from 'src/app/models/curso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, of, switchMap } from 'rxjs';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {}

  public getAllCursos(): Observable<CursoModel[]> {
    const url = `${url_config.url_curso}`;
    return this.http.get<CursoModel[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  public criarCurso(curso: CursoModel) {
    return this.http.post(url_config.url_curso, curso);
  }

  public atualizarCurso(curso: CursoModel) {
    return this.http.patch(`${url_config.url_curso}/${curso.curso_id}`, curso);
  }

  public deletarCursos(cursos: CursoModel[]) {
    const arrReqs: Observable<any>[] = [];
    cursos.forEach((r) => {
      arrReqs.push(this.http.delete(`${url_config.url_curso}/${r.curso_id}`));
    });

    return forkJoin(...arrReqs);
  }
}
