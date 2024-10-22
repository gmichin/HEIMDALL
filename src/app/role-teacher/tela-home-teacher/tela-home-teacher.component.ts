import { ProfessorModel } from './../../models/professor.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CursoModel } from 'src/app/models/curso.model';
import { SessionService } from 'src/app/services/session.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';

@Component({
  selector: 'app-tela-home-teacher',
  templateUrl: './tela-home-teacher.component.html',
  styleUrls: ['./tela-home-teacher.component.scss'],
})
export class TelaHomeTeacherComponent implements OnInit, OnDestroy {
  public data = <
    {
      name: 'Cursos' | 'Professores' | 'Administradores';
      arr: CursoModel[] & ProfessorModel[];
    }[]
  >this.activatedRoute.snapshot.data['dados'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {}

  ngOnInit() {}

  public redirectHorarios() {
    this.router.navigate(['/tela-mapa-horario-salas']);
  }

  public redirectReserve() {
    const dialogT = this.dialog.open(TelaReservasComponent, {
      width: '400px',
    });
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }
  logout() {
    this.router.navigate(['/']);
  }
  public seeMore(items: CursoModel[] & ProfessorModel[]): void {}
}
