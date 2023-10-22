import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { getUserRequest, getUserResponse } from '../models/login.model';
import { url_config } from '../url.config';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(private http: HttpClient, private router: Router) {}

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
      })
    );
  }
}
