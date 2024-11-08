import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, of, switchMap } from 'rxjs';
import { url_config } from '../url.config';
import { ProfessorModel } from '../models/professor.model';
import { AlunoModel } from '../models/aluno.model';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private http: HttpClient) {}

  public getAllAlunos(): Observable<AlunoModel[]> {
    const url = `${url_config.url_aluno}`;
    return this.http.get<AlunoModel[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  public criarAluno(aluno: AlunoModel) {
    return this.http.post(url_config.url_aluno, aluno);
  }

  public atualizarAluno(aluno: AlunoModel) {
    return this.http.patch(`${url_config.url_aluno}/${aluno.aluno_id}`, aluno);
  }

  public deletarAlunos(aluno: AlunoModel[]) {
    const arrReqs: Observable<any>[] = [];
    aluno.forEach((r) => {
      arrReqs.push(this.http.delete(`${url_config.url_aluno}/${r.aluno_id}`));
    });

    return forkJoin(...arrReqs);
  }
}
