import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RegisterUserResponse } from '../models/register.models';
import { RoleService } from './../services/role.service';
import { SessionService } from './../services/session.service';

@Injectable()
export class TelaPerfilResolver implements Resolve<any> {
  constructor(
    private sessionService: SessionService,
    private roleService: RoleService
  ) {}

  resolve(): Observable<{
    dataUser: RegisterUserResponse;
    roleDesc: string;
  }> {
    const dataUser =
      this.sessionService.getSessionData<RegisterUserResponse>('dataUser');
    return this.roleService.validateRole(dataUser.retorno.role_id).pipe(
      map((res) => ({
        dataUser: dataUser.retorno,
        roleDesc: res,
      }))
    );
  }
}
