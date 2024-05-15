import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SessionService } from '../services/session.service';
import { RegisterUserResponse } from '../models/register.models';
import { RoleId } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RedirecionarUsuarioGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const user = this.sessionService.getSessionData<RegisterUserResponse>('user').retorno;
    let ret;
    switch(user.role){
      case RoleId.ADM:
        ret = this.router.parseUrl('/home-adm');
        break;
      case RoleId.PROFESSOR:
        ret = this.router.parseUrl('/home-teacher');
        break;
      case RoleId.ALUNO:
        ret = this.router.parseUrl('/home-student');
        break;
      default:
       ret = this.router.parseUrl('/home-adm');
    }
    return ret;
  }
}
