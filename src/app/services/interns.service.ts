import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { RegisterInstitutionResponse, RegisterUserResponse } from '../models/register.models';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { RoleId } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class InternsService {
  constructor(private http: HttpClient, private sessionService: SessionService) {}

  public getAllAdms() {
    const id = this.sessionService.getSessionData('idInstitution').retorno;
    const url = `${url_config.url_user}/role/${RoleId.ADM}/inst/${id}`;
    return this.http
    .get<RegisterUserResponse[]>(
      url
    ).pipe(
      tap((resp)=>{
        this.sessionService.setItem('adms', resp)
      }),
      catchError(()=> {
        return of([]);
      })
    );
  }

  public getAllTeachers() {
    const id = this.sessionService.getSessionData('idInstitution').retorno;
    const url = `${url_config.url_user}/role/${RoleId.PROFESSOR}/inst/${id}`;
    return this.http
    .get<RegisterUserResponse[]>(
      url
    ).pipe(
      tap((resp)=>{
        this.sessionService.setItem('teachers', resp)
      }),
      catchError(()=> {
        return of([]);
      })
    );
  }

}
