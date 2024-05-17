import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {

constructor(
  private readonly router: Router,
  private readonly sessionService: SessionService,

) { }

reoladPage(rota: string[]){
  this.sessionService.setItem('reload', rota);
  this.router.navigate(['reload']);
}

getRoute(): string[] {
  return this.sessionService.getSessionData<string[]>('reload').retorno;
}

}
