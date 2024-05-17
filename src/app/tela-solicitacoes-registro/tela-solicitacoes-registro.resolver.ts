import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { RoleService } from '../services/role.service';
import { SessionService } from '../services/session.service';
import { ResgistrationRequestsService } from '../services/resgistration-requests.service';

@Injectable({
  providedIn: 'root',
})
export class TelaSolicitacoesRegistroResolver implements Resolve<any> {
  constructor(
    private readonly _registrationService: ResgistrationRequestsService,
  ) {}

  resolve() {
    return this._registrationService.findRequestsByInst();
  }
}
