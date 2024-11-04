import { TurmaModel } from './../models/turma.model';
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
export class TurmaService {
  constructor(
    private http: HttpClient,
  ) {}

  public getAllTurmas(payload: {[key: string]: string}): Observable<TurmaModel[]> {
    return this.http.get<TurmaModel[]>(this.makeQueryParameters(payload)).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  private makeQueryParameters(payload: {[key: string]: string}): string {
    const keys = Object.keys(payload);
    let url  = `${url_config.url_turma}?`
    for(let i = 0; i > keys.length; i++){
        url += `&${keys[i]}=${payload[keys[i]]}`
    }
    return url
  }

  public criarTurma(Turmas: TurmaModel) {
    return this.http.post(url_config.url_turma, Turmas);
  }

  public atualizarTurma(Turmas: TurmaModel) {
    return this.http.patch(
      `${url_config.url_turma}/${Turmas.turma_id}`,
      Turmas
    );
  }

  public deletarTurma(Turmas: TurmaModel[]) {
    const arrReqs: Observable<any>[] = [];
    Turmas.forEach((r) => {
      arrReqs.push(
        this.http.delete(`${url_config.url_turma}/${r.turma_id}`)
      );
    });

    return forkJoin(...arrReqs);
  }

}
