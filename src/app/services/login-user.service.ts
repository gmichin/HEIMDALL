import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { getUserRequest, getUserResponse } from '../models/login.model';
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

  public login(request: getUserRequest): Observable<getUserResponse> {
    return this.http.get<getUserResponse[]>(url_config.url_user).pipe(
      map((data) => {
        const selectedUser = data.filter(
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
