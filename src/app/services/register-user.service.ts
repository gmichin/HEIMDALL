import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import {
  Instituition,
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
        switchMap((resp) => this.register(request, resp._id, true))
      );
  }

  register(
    request: RegisterUserRequest,
    idInstitution: string,
    adm: boolean = false
  ): Observable<RegisterUserResponse> {
    request.instituition = {_id:idInstitution};
    return this.http
      .post<RegisterUserResponse>(url_config.url_user, request)
      .pipe(
        map((resp) => {
          this.sessionService.setItem('idInstitution', idInstitution );
          this.sessionService.setItem('user', resp );
          return resp;
        }),
        catchError(() => of(new RegisterUserResponse(request))),
      );
  }

  updateUser(request: RegisterUserResponse) {
    return this.http
    .patch<RegisterUserResponse>(`${url_config.url_user}/${request._id}`, request).pipe(
      map(resp => {
        this.sessionService.setItem('user', resp );
      })
    )
  }

  searchInstByName(name:string): Observable<RegisterInstitutionResponse>{
    return this.http.get<RegisterInstitutionResponse>(`${url_config.url_instituition}/search-by-name/${name}`);
  }

  inviteStudent(request: RegisterUserRequest) {
    return this.http.post(url_config.url_registration,request);
  }
}
