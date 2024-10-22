import { DisciplinaService } from 'src/app/services/disciplina.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TelaDisciplinasComponent } from '../tela-disciplinas.component';
import { CursoService } from 'src/app/services/curso.service';
import { CursoModel } from 'src/app/models/curso.model';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { SessionService } from 'src/app/services/session.service';
import { ProfessorModel } from 'src/app/models/professor.model';
import { AlunoModel } from 'src/app/models/aluno.model';

@Component({
  selector: 'app-tela-disciplinas-feitas',
  templateUrl: './tela-disciplinas-feitas.component.html',
  styleUrls: ['./tela-disciplinas-feitas.component.scss'],
})
export class TelaDisciplinasFeitasComponent {
  displayedColumns: string[] = ['remove', 'edit', 'name', 'description'];
  dataSource = new MatTableDataSource<DisciplinaModel>();
  selectionCourse = new SelectionModel<string>(true, []);
  selection = new SelectionModel<DisciplinaModel>(true, []);
  selectionReject = new SelectionModel<DisciplinaModel>(true, []);
  courseList!: CursoModel[];
  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public idProfessorAdm = this.dataProfessorAdm.professor_id;
  public idAluno = this.dataAluno.aluno_id;
  public tipoUsuario = '';

  constructor(
    public dialog: MatDialog,
    private cursoService: CursoService,
    private snackBar: MatSnackBar,
    private disciplinaService: DisciplinaService,
    private router: Router,
    private sessionService: SessionService
  ) {
    switch (this.dataProfessorAdm.adm) {
      case true:
        this.tipoUsuario = 'Administrador';
        break;
      case false:
        this.tipoUsuario = 'Professor';
        break;
    }
    if (this.dataAluno) this.tipoUsuario = 'Aluno';
    this.cursoService.getAllCursos().subscribe({
      next: (cursos) => {
        this.courseList = cursos;
      },
    });
  }
  goBack() {
    if (this.tipoUsuario == 'Administrador')
      this.router.navigate(['/home-adm']);
    else if (this.tipoUsuario == 'Professor')
      this.router.navigate(['/home-teacher']);
    else if (this.tipoUsuario == 'Aluno')
      this.router.navigate(['/home-student']);
  }
  logout() {
    this.router.navigate(['/']);
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }

  openReservas() {
    const dialogRef = this.dialog.open(TelaReservasComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMaterias() {
    const dialogRef = this.dialog.open(TelaDisciplinasComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSalas() {
    const dialogRef = this.dialog.open(TelaSalasComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeCourse(event: any) {
    this.selectionCourse.clear();
    this.selectionCourse.toggle(event);
    this.disciplinaService
      .getDisciplinaPorCurso(this.selectionCourse.selected[0])
      .subscribe({
        next: (res) => {
          this.dataSource.data = res;
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a busca por matérias, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['tela-materias-feitas']);
        },
      });
  }

  @ViewChild(MatTable)
  table!: MatTable<DisciplinaModel>;

  editMateria() {
    this.disciplinaService.salvarDisciplinaToEdit(this.selection.selected[0]);
  }

  apagarMaterias() {
    this.disciplinaService
      .deletarDisciplina(this.selectionReject.selected)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Removida(s) com sucesso!', '', {
            duration: 4000,
          });
          this.router.navigate(['tela-materias-feitas']);
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a solicitação, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['tela-materias-feitas']);
        },
      });
  }

  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selectionReject.isSelected(row)) {
        this.selectionReject.select(row);
      }
    });
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }
}
