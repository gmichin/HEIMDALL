import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { getUserRequest } from '../models/login.model';
import { RegisterUserResponse } from '../models/register.models';
import { url_config } from '../url.config';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  public login(request: getUserRequest): Observable<RegisterUserResponse> {
    return this.http.get<RegisterUserResponse[]>(url_config.url_user).pipe(
      map(() => {
        throw '';
      }),
      catchError(() => of(<RegisterUserResponse[]>[])),
      map((data) => {
        const userAdm = [
          this.sessionService.getSessionData<RegisterUserResponse>('userData')
            .retorno,
        ];
        const selectedUser = userAdm.filter(
          (user) => user.email == request.email && user.email == request.email
        );
        if (selectedUser.length > 0) {
          return selectedUser[0];
        }
        throw 'Não encontrado na base de dados.';
      }),
      tap((data) => {
        this.sessionService.setItem('idInstitution', data.institution_id);
        this.sessionService.setItem('userData', data);
      })
    );
  }
}
