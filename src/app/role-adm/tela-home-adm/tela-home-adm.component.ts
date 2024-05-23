import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { RoleService } from 'src/app/services/role.service';
import { SessionService } from 'src/app/services/session.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaReservasComponent} from 'src/app/tela-reservas/tela-reservas.component'
import { TelaCreateAdmComponent } from '../tela-create-adm/tela-create-adm.component';
import { TelaCreateCourseComponent } from '../tela-create-course/tela-create-course.component';
import { TelaCreateTeacherComponent } from '../tela-create-teacher/tela-create-teacher.component';
import { TelaEditAdmComponent } from '../tela-edit-adm/tela-edit-adm.component';
import { TelaEditCourseComponent } from '../tela-edit-course/tela-edit-course.component';
import { TelaEditTeacherComponent } from '../tela-edit-teacher/tela-edit-teacher.component';
import { ReloadService } from 'src/app/services/reload.service';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaMateriasComponent } from 'src/app/tela-materias/tela-materias.component';

@Component({
  selector: 'app-tela-home-adm',
  templateUrl: './tela-home-adm.component.html',
  styleUrls: ['./tela-home-adm.component.scss'],
})
export class TelaHomeAdmComponent implements OnInit, OnDestroy {
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
    private reload: ReloadService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit() {
  }

  public redirectRegistrationList() {
    this.router.navigate(['tela-solicitacoes-registro']);
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }

  public redirectHomeAdm() {
    this.reload.reoladPage(['redirecionar'])
  }

  public redirectReserve() {
    const dialogT = this.dialog.open(TelaReservasComponent, {
      width: '400px',
    });
  }

  public redirectSalas() {
    const dialogT = this.dialog.open(TelaSalasComponent, {
      width: '400px',
    });
  }

  public redirectMaterias() {
    const dialogT = this.dialog.open(TelaMateriasComponent, {
      width: '400px',
    });
  }

  public editItem(
    blockName: 'Cursos' | 'Professores' | 'Administradores',
    item?: CourseModelResponse | RegisterUserResponse
  ) {
    const type: any = {
      Cursos: TelaEditCourseComponent,
      Professores: TelaEditTeacherComponent,
      Administradores: TelaEditAdmComponent,
    };

    const dialogT = this.dialog.open(type[blockName], {
      data: item,
      width: '400px',
    });

    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }

  public createItem(
    blockName: 'Cursos' | 'Professores' | 'Administradores',
    item?: CourseModelResponse & RegisterUserResponse,
    items?: CourseModelResponse[] & RegisterUserResponse[]
  ): void {
    const type: any = {
      Cursos: TelaCreateCourseComponent,
      Professores: TelaCreateTeacherComponent,
      Administradores: TelaCreateAdmComponent,
    };
    const dialogT = this.dialog.open(type[blockName], {
      width: '400px',
    });

    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }

  private dialogCloseSubs() {
    this.reload.reoladPage(['home-adm']);
  }
  
  public seeMore(items: (CourseModelResponse | RegisterUserResponse)[]): void {
    this.router.navigate(['tela-see-more'], { state: { data: items } });
  }
}
