import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoModel } from 'src/app/models/curso.model';
import { ProfessorModel } from 'src/app/models/professor.model';
import { SessionService } from 'src/app/services/session.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { TelaCreateAdmComponent } from '../tela-create-adm/tela-create-adm.component';
import { TelaCreateCourseComponent } from '../tela-create-course/tela-create-course.component';
import { TelaCreateTeacherComponent } from '../tela-create-teacher/tela-create-teacher.component';
import { TelaEditAdmComponent } from '../tela-edit-adm/tela-edit-adm.component';
import { TelaEditCourseComponent } from '../tela-edit-course/tela-edit-course.component';
import { TelaEditTeacherComponent } from '../tela-edit-teacher/tela-edit-teacher.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaDisciplinasComponent } from 'src/app/tela-disciplinas/tela-disciplinas.component';

@Component({
  selector: 'app-tela-home-adm',
  templateUrl: './tela-home-adm.component.html',
  styleUrls: ['./tela-home-adm.component.scss'],
})
export class TelaHomeAdmComponent implements OnInit, OnDestroy {
  public data = <
    {
      name: 'Cursos' | 'Professores' | 'Administradores';
      arr: CursoModel[] & ProfessorModel[];
    }[]
  >this.activatedRoute.snapshot.data['dados'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private sessionService: SessionService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit() {}

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
    const dialogT = this.dialog.open(TelaDisciplinasComponent, {
      width: '400px',
    });
  }

  public editItem(
    blockName: 'Cursos' | 'Professores' | 'Administradores',
    item?: CursoModel | ProfessorModel
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
    item?: CursoModel & ProfessorModel,
    items?: CursoModel[] & ProfessorModel[]
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
    this.router.navigate(['home-adm']);
  }

  public seeMore(items: (CursoModel | ProfessorModel)[]): void {
    this.router.navigate(['tela-see-more'], { state: { data: items } });
  }
  logout() {
    this.router.navigate(['/']);
  }
}
