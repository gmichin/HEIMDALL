import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { RoleService } from './../services/role.service';
import { SessionService } from './../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class TelaPerfilResolver implements Resolve<any> {
  constructor(
    private sessionService: SessionService,
    private roleService: RoleService
  ) {}

  resolve() {
    return of({});
  }
}
