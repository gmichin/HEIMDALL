import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
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
    const url = `${url_config.url_user}/${id}?roleId=${RoleId.ADM}`;
    return this.http
    .get<RegisterUserResponse[]>(
      url_config.url_user
    );
  }

  public getAllTeachers() {
    const id = this.sessionService.getSessionData('idInstitution').retorno;
    const url = `${url_config.url_user}/${id}?roleId=${RoleId.PROFESSOR}`;
    return this.http
    .get<RegisterUserResponse[]>(
      url_config.url_user
    );
  }

}
