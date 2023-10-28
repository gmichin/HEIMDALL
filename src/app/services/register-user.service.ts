import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import {
  RegisterInstitutionRequest,
  RegisterInstitutionResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from '../models/register.models';
import { url_config } from './../url.config';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  registerAdm(
    request: RegisterUserRequest,
    requestInstitution: RegisterInstitutionRequest,
    subAdm: boolean = false
  ): Observable<any> {
    return this.http
      .post<RegisterInstitutionResponse>(
        url_config.url_instituition,
        requestInstitution
      )
      .pipe(switchMap((resp) => this.register(request, resp._id, !subAdm)));
  }

  register(
    request: RegisterUserRequest,
    idInstitution: string,
    adm: boolean = false
  ): Observable<RegisterUserResponse> {
    request.institution_id = idInstitution;
    return this.http
      .post<RegisterUserResponse>(url_config.url_user, request)
      .pipe(
        tap((data) => {
          if (adm) {
            this.sessionService.setItem('idInstitution', idInstitution);
            this.sessionService.setItem('userData', data);
          }
        })
      );
  }
}
