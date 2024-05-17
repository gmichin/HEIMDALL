import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { RoleService } from '../services/role.service';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class TelaSolicitacoesRegistroResolver implements Resolve<any> {
  constructor() {}

  resolve() {
    return of({});
  }
}
