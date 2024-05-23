import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { ReloadService } from 'src/app/services/reload.service';
import { RoleService } from 'src/app/services/role.service';
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
      arr: CourseModelResponse[] & RegisterUserResponse[];
    }[]
  >this.activatedRoute.snapshot.data['dados'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private reload: ReloadService,
    private roleService: RoleService
  ) {}
  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

  public redirectHorarios() {
    this.reload.reoladPage(['/tela-mapa-horario-salas']);
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
    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }

  private dialogCloseSubs() {
    this.reload.reoladPage(['reload']);
  }
  public seeMore(items: CourseModelResponse[] & RegisterUserResponse[]): void {}
}
