import { ProfessorService } from '../../services/professor.service';
import { CursoService } from 'src/app/services/curso.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CursoModel } from 'src/app/models/curso.model';
import { ProfessorModel } from 'src/app/models/professor.model';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { TelaCreateAlunoComponent } from '../tela-create-aluno/tela-create-aluno.component';
import { TelaCreateCourseComponent } from '../tela-create-course/tela-create-course.component';
import { TelaCreateTeacherComponent } from '../tela-create-teacher/tela-create-teacher.component';
import { TelaEditAlunoComponent } from '../tela-edit-aluno/tela-edit-aluno.component';
import { TelaEditCourseComponent } from '../tela-edit-course/tela-edit-course.component';
import { TelaEditTeacherComponent } from '../tela-edit-teacher/tela-edit-teacher.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaDisciplinasComponent } from 'src/app/tela-disciplinas/tela-disciplinas.component';
import { TelaTurmasComponent } from 'src/app/tela-turmas/tela-turmas.component';
import { AlunoService } from 'src/app/services/aluno.service';
import { AlunoModel } from 'src/app/models/aluno.model';

@Component({
  selector: 'app-tela-home-adm',
  templateUrl: './tela-home-adm.component.html',
  styleUrls: ['./tela-home-adm.component.scss'],
})
export class TelaHomeAdmComponent implements OnInit, OnDestroy {
  public data: {
    name: 'Cursos' | 'Professores' | 'Alunos';
    arr: any[];
  }[] = [];
  public dataProfessor: any[] = [];
  public dataCursos: any[] = [];
  public dataAluno: any[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cursoService: CursoService,
    private professorService: ProfessorService,
    private alunoService: AlunoService
  ) {
    this.alunoService.getAllAlunos().subscribe(
      (dadosAlunos) => {
        this.dataAluno = dadosAlunos;
        this.processarDados();
      },
      (error) => {
        console.error('Erro ao carregar dados dos alunos:', error);
      }
    );
    this.professorService.getAllProfessores().subscribe(
      (dadosProfessores) => {
        this.dataProfessor = dadosProfessores;
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
    const alunos = this.dataAluno.filter((aluno) => aluno.status === true);
    const professores = this.dataProfessor.filter(
      (professor) => professor.adm === false && professor.status === true
    );
    const cursos = this.dataCursos.length > 0 ? this.dataCursos : [];

    this.data = [
      { name: 'Alunos', arr: alunos },
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
    blockName: 'Cursos' | 'Professores' | 'Alunos',
    item?: CursoModel | ProfessorModel | AlunoModel,
    items?: (CursoModel | ProfessorModel | AlunoModel)[]
  ): void {
    const type: any = {
      Cursos: TelaCreateCourseComponent,
      Professores: TelaCreateTeacherComponent,
      Alunos: TelaCreateAlunoComponent,
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
    blockName: 'Cursos' | 'Professores' | 'Alunos',
    item?: CursoModel | ProfessorModel | AlunoModel
  ): void {
    const type: any = {
      Cursos: TelaEditCourseComponent,
      Professores: TelaEditTeacherComponent,
      Alunos: TelaEditAlunoComponent,
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

  public seeMore(items: (CursoModel | ProfessorModel | AlunoModel)[]): void {
    this.router.navigate(['tela-see-more'], { state: { data: items } });
  }

  logout() {
    this.router.navigate(['/']);
  }
}
