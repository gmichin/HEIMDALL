import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { RoleService } from 'src/app/services/role.service';
import { SessionService } from 'src/app/services/session.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';

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
    private sessionService: SessionService,
    private roleService: RoleService
  ) {}
  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

  public redirectHorarios() {
    this.router.navigate(['/tela-mapa-horario-salas']);
  }
  
  public redirectReserve() {
    this.router.navigate(['/tela-reservas']);
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
    this.router.navigate(['reload']);
  }
  public seeMore(items: CourseModelResponse[] & RegisterUserResponse[]): void {}
}
