import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SessionService } from '../services/session.service';
import { ProfessorModel } from '../models/professor.model';
import { AlunoModel } from '../models/aluno.model';

@Injectable({
  providedIn: 'root',
})
export class RedirecionarUsuarioGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const professorAdm =
      this.sessionService.getSessionData<ProfessorModel>('professor');
    const aluno =
      this.sessionService.getSessionData<AlunoModel>('aluno');

    if (professorAdm.valido) {
      return professorAdm.retorno.adm
        ? this.router.parseUrl('/home-adm')
        : this.router.parseUrl('/home-teacher');
    } else if (aluno.valido) {
      return this.router.parseUrl('/home-student');
    } else {
      return this.router.parseUrl('/home-adm');
    }
  }

  private isProfessorModel(obj: any): obj is ProfessorModel {
    return obj && typeof obj.adm !== 'undefined';
  }
}
