import { CursoModel } from 'src/app/models/curso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
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

  public criarCurso(curso: CursoModel) {
    return this.http.post(url_config.url_curso, curso);
  }

  public atualizarCurso(curso: CursoModel) {
    return this.http.patch(`${url_config.url_curso}/${curso.curso_id}`, curso);
  }
}
