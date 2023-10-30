import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
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
    requestInstitution: RegisterInstitutionRequest
  ): Observable<any> {
    return this.http
      .post<RegisterInstitutionResponse>(
        url_config.url_instituition,
        requestInstitution
      )
      .pipe(
        catchError(() =>
          of(new RegisterInstitutionResponse(requestInstitution))
        ),
        tap((res) => this.sessionService.setItem('dadosInstituto', res)),
        switchMap((resp) => this.register(request, resp._id, true))
      );
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
        map(() => {
          throw '';
        }),
        catchError(() => of(new RegisterUserResponse(request))),
        tap((data) => {
          if (adm) {
            data.institution_id = idInstitution;
            this.sessionService.setItem('idInstitution', idInstitution);
            this.sessionService.setItem('userData', data);
          }
        })
      );
  }
}
