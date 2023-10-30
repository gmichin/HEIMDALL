import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { RoleService } from 'src/app/services/role.service';
import { SessionService } from 'src/app/services/session.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaCreateAdmComponent } from '../tela-create-adm/tela-create-adm.component';
import { TelaCreateCourseComponent } from '../tela-create-course/tela-create-course.component';
import { TelaCreateTeacherComponent } from '../tela-create-teacher/tela-create-teacher.component';
import { TelaEditAdmComponent } from '../tela-edit-adm/tela-edit-adm.component';
import { TelaEditCourseComponent } from '../tela-edit-course/tela-edit-course.component';
import { TelaEditTeacherComponent } from '../tela-edit-teacher/tela-edit-teacher.component';

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
    private roleService: RoleService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit() {
    const dataUser =
      this.sessionService.getSessionData<RegisterUserResponse>('userData');
    return this.roleService
      .validateRole(dataUser.retorno.role_id)
      .pipe(
        map((res) => ({
          dataUser: dataUser.retorno,
          roleDesc: res,
        }))
      )
      .subscribe((res) => this.sessionService.setItem('profile', res));
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
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
    this.router.navigate(['reload']);
  }
  public seeMore(items: CourseModelResponse[] & RegisterUserResponse[]): void {}
}
