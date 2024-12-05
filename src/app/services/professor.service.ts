import { CursoModel } from 'src/app/models/curso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, of, switchMap } from 'rxjs';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { ProfessorModel } from '../models/professor.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {}

  public getAllProfessores(): Observable<ProfessorModel[]> {
    const url = `${url_config.url_professor}`;
    return this.http.get<ProfessorModel[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  public criarProfessor(professor: ProfessorModel) {
    return this.http.post(url_config.url_professor, professor);
  }
  
  public sendCodeEmail(req: {code: string, email: string}, url: string) {
    return this.http.post(url, req);
  }

  public atualizarProfessor(professor: ProfessorModel) {
    return this.http.patch(
      `${url_config.url_professor}/${professor.professor_id}`,
      professor
    );
  }

  public deletarProfessores(professor: ProfessorModel[]) {
    const arrReqs: Observable<any>[] = [];
    professor.forEach((r) => {
      arrReqs.push(
        this.http.delete(`${url_config.url_professor}/${r.professor_id}`)
      );
    });

    return forkJoin(...arrReqs);
  }
}
