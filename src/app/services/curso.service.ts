import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { CursoModel } from '../models/curso.model';
import { url_config } from '../url.config';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(
    private http: HttpClient,
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

  public criarCurso(course: CursoModel) {
    return this.http.post(url_config.url_curso, course);
  }

  public atualizarCurso(curso: CursoModel) {
    return this.http.patch(`${url_config.url_curso}/${curso.curso_id}`, curso);
  }
}
