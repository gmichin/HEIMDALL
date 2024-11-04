import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { TurmaModel } from '../models/turma.model';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) {}

  public getAllTurmas(): Observable<TurmaModel[]> {
    const url = `${url_config.url_turma}`;
    return this.http.get<TurmaModel[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  public criarTurma(turmas: TurmaModel) {
    return this.http.post(url_config.url_turma, turmas);
  }

  public atualizarTurmas(turma: TurmaModel) {
    return this.http.patch(`${url_config.url_turma}/${turma.turma_id}`, turma);
  }

  public deletarTurma(turma: TurmaModel[]) {
    const arrReqs: Observable<any>[] = [];
    turma.forEach((r) => {
      arrReqs.push(this.http.delete(`${url_config.url_turma}/${r.turma_id}`));
    });

    return forkJoin(...arrReqs);
  }

  public getTurmaPorCurso(courseId: string): Observable<TurmaModel[]> {
    return this.http.get<TurmaModel[]>(`${url_config.url_turma}/${courseId}`);
  }

  public salvarTurmaToEdit(turma: TurmaModel) {
    this.sessionService.setItem('editTurmas', turma);
    this.router.navigate(['tela-novas-turmas']);
  }

  public getTurmaToEdit(): { turma: TurmaModel; valid: boolean } {
    const disciplinas =
      this.sessionService.getSessionData<TurmaModel>('editTurma');
    if (disciplinas.valido) {
      sessionStorage.removeItem('editTurma');
      return { valid: true, turma: disciplinas.retorno };
    }
    return { valid: false, turma: {} as TurmaModel };
  }
}
