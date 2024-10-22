import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { ProfessorModel } from '../models/professor.model';

@Injectable({
  providedIn: 'root',
})
export class InternsService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  public getAllAdms() {
    const url = `${url_config.url_professor}`;
    return this.http.get<ProfessorModel[]>(url).pipe(
      tap((resp) => {
        this.sessionService.setItem('adms', resp);
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  public getAllTeachers() {
    const id = this.sessionService.getSessionData('idInstitution').retorno;
    const url = `${url_config.url_professor}`;
    return this.http.get<ProfessorModel[]>(url).pipe(
      tap((resp) => {
        this.sessionService.setItem('teachers', resp);
      }),
      catchError(() => {
        return of([]);
      })
    );
  }
}
