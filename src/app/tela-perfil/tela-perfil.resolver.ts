import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { SessionService } from './../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class TelaPerfilResolver implements Resolve<any> {
  constructor(private sessionService: SessionService) {}

  resolve() {
    return of({});
  }
}
