import { ProfessorService } from '../../services/professor.service';
import { CursoService } from 'src/app/services/curso.service';
import { SalaDataService } from './../../services/sala-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CursoModel } from 'src/app/models/curso.model';
import { ProfessorModel } from 'src/app/models/professor.model';
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
import { TelaTurmasComponent } from 'src/app/tela-turmas/tela-turmas.component';

@Component({
  selector: 'app-tela-home-adm',
  templateUrl: './tela-home-adm.component.html',
  styleUrls: ['./tela-home-adm.component.scss'],
})
export class TelaHomeAdmComponent implements OnInit, OnDestroy {
  public data: {
    name: 'Cursos' | 'Professores' | 'Administradores';
    arr: any[];
  }[] = [];
  public dataProfessorAdm: any[] = [];
  public dataCursos: any[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cursoService: CursoService,
    private professorService: ProfessorService
  ) {
    this.professorService.getAllProfessores().subscribe(
      (dadosProfessores) => {
        this.dataProfessorAdm = dadosProfessores;
        this.processarDados();
      },
      (error) => {
        console.error('Erro ao carregar dados dos professores:', error);
      }
    );
    this.cursoService.getAllCursos().subscribe(
      (dadosCursos) => {
        this.dataCursos = dadosCursos;
        this.processarDados();
      },
      (error) => {
        console.error('Erro ao carregar dados dos cursos:', error);
      }
    );
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  private processarDados() {
    const administradores = this.dataProfessorAdm.filter(
      (professor) => professor.adm === true
    );
    const professores = this.dataProfessorAdm.filter(
      (professor) => professor.adm === false
    );
    const cursos = this.dataCursos.length > 0 ? this.dataCursos : [];

    this.data = [
      { name: 'Administradores', arr: administradores },
      { name: 'Professores', arr: professores },
      { name: 'Cursos', arr: cursos },
    ];
  }

  public redirectValidacaoAlunos() {
    this.router.navigate(['validacao-alunos']);
  }
  public redirectValidacaoProfessores() {
    this.router.navigate(['validacao-professores']);
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

  public redirectDisciplinas() {
    const dialogT = this.dialog.open(TelaDisciplinasComponent, {
      width: '400px',
    });
  }

  public redirectTurmas() {
    const dialogT = this.dialog.open(TelaTurmasComponent, {
      width: '400px',
    });
  }
  public createItem(
    blockName: 'Cursos' | 'Professores' | 'Administradores',
    item?: CursoModel | ProfessorModel,
    items?: (CursoModel | ProfessorModel)[]
  ): void {
    const type: any = {
      Cursos: TelaCreateCourseComponent,
      Professores: TelaCreateTeacherComponent,
      Administradores: TelaCreateAdmComponent,
    };
    1;
    const dialogT = this.dialog.open(type[blockName], {
      width: '400px',
    });

    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }

  public editItem(
    blockName: 'Cursos' | 'Professores' | 'Administradores',
    item?: CursoModel | ProfessorModel
  ): void {
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
