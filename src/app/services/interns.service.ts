import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { RegisterUserResponse } from '../models/register.models';
import { url_config } from '../url.config';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class InternsService {
  constructor(private http: HttpClient, private session: SessionService) {}

  public getAllAdms() {
    return of({}).pipe(
      switchMap(() => {
        const adms =
          this.session.getSessionData<RegisterUserResponse[]>('adms');
        if (adms.valido) {
          return of(adms.retorno);
        }
        return of([]);
      }),
      map((users) => {
        if (users.length == 0) {
          return users;
        }
        const validUser = users.filter((user) =>
          this.validateUserToRole(<'0' | '1' | '2'>user.role_id, '1')
        );
        return validUser;
      })
    );
  }

  // <RegisterUserResponse>{
  //   _id!: '1',
  //   email!: 'antonio@gmail.com',
  //   name!: 'Antônio',
  //   registration_number!: '0',
  //   encrypted_password!: 'antonio123',
  //   role_id!: '1',
  //   institution_id!: this.session.getSessionData<string>('idInstitution').retorno,
  // },

  public getAllTeachers() {
    return of({}).pipe(
      switchMap(() => {
        const teachers =
          this.session.getSessionData<RegisterUserResponse[]>('teachers');
        if (teachers.valido) {
          return of(teachers.retorno);
        }
        return of([]);
      }),
      map((users) => {
        if (users.length == 0) {
          return users;
        }
        const validUser = users.filter((user) =>
          this.validateUserToRole(<'0' | '1' | '2'>user.role_id, '2')
        );
        return validUser;
      })
    );
  }

  private validateUserToRole(
    userRole: '0' | '1' | '2',
    roleResponse: string
  ): boolean {
    return roleResponse == userRole;
  }

  private getUsers(): Observable<RegisterUserResponse[]> {
    return this.http.get<RegisterUserResponse[]>(url_config.url_user);
  }
}
