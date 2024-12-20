import { CursoService } from 'src/app/services/curso.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CursoModel } from '../models/curso.model';
import { SessionService } from '../services/session.service';
import { TelaPerfilComponent } from '../tela-perfil/tela-perfil.component';
import { ProfessorModel } from '../models/professor.model';
import { TelaEditCourseComponent } from '../role-adm/tela-edit-course/tela-edit-course.component';
import { TelaEditAlunoComponent } from '../role-adm/tela-edit-aluno/tela-edit-aluno.component';
import { TelaEditTeacherComponent } from '../role-adm/tela-edit-teacher/tela-edit-teacher.component';
import { ProfessorService } from '../services/professor.service';
import { AlunoModel } from '../models/aluno.model';
import { AlunoService } from '../services/aluno.service';
@Component({
  selector: 'app-tela-see-more',
  templateUrl: './tela-see-more.component.html',
  styleUrls: ['./tela-see-more.component.scss'],
})
export class TelaSeeMoreComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<CursoModel | ProfessorModel | AlunoModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectionEdit = new SelectionModel<CursoModel | ProfessorModel | AlunoModel>(
    true,
    []
  );
  selectionDelete = new SelectionModel<
    CursoModel | ProfessorModel | AlunoModel
  >(true, []);

  public navigation = this.router.getCurrentNavigation();
  public state = this.navigation?.extras.state;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private cursoService: CursoService,
    private professorService: ProfessorService,
    private alunoService: AlunoService
  ) {
    if (this.state && this.state['data']) {
      let items: (CursoModel | ProfessorModel | AlunoModel)[] =
        this.state['data'];

      if (items.length > 0) {
        console.log('Primeiro item:', items[0]);

        if ('professor_id' in items[0]) {
          this.displayedColumns = [
            'EDIT',
            'DELETE',
            'nome',
            'email',
            'registrationNumber',
          ];

          items = items.filter(
            (item) => 'professor_id' in item && item['status'] === true
          );
        } else if ('curso_id' in items[0]) {
          this.displayedColumns = ['EDIT', 'DELETE', 'nome', 'descricao'];
        } else if ('aluno_id' in items[0]) {
          this.displayedColumns = [
            'EDIT',
            'DELETE',
            'nome',
            'email',
            'registrationNumber',
          ];

          items = items.filter(
            (item) => 'aluno_id' in item && item['status'] === true
          );
        }
        this.dataSource = new MatTableDataSource(items);
      }
    }
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(item?: CursoModel | ProfessorModel | AlunoModel) {
    if (this.state && this.state['data']) {
      const items: (CursoModel | ProfessorModel | AlunoModel)[] =
        this.state['data'];

      if (items.length > 0) {
        console.log('Primeiro item:', items[0]);

        if ('aluno_id' in items[0]) {
          // Check if item is a student
          const dialogT = this.dialog.open(TelaEditAlunoComponent, {
            data: item,
            width: '400px',
          });
        } else if ('professor_id' in items[0]) {
          // Check if item is a professor and only then access adm
          const professor = item as ProfessorModel;
          if (professor.adm === false) {
            const dialogT = this.dialog.open(TelaEditTeacherComponent, {
              data: item,
              width: '400px',
            });
          }
        } else if ('curso_id' in items[0] || 'descricao' in items[0]) {
          // If item is a course
          const dialogT = this.dialog.open(TelaEditCourseComponent, {
            data: item,
            width: '400px',
          });
        }
      }
    }
  }

  apagar() {
    if (this.state && this.state['data']) {
      const items: (CursoModel | ProfessorModel | AlunoModel)[] =
        this.state['data'];

      if (items.length > 0) {
        const selectedItems = this.selectionDelete.selected;

        if (selectedItems.length > 0) {
          if ('professor_id' in items[0]) {
            this.professorService
              .deletarProfessores(selectedItems as ProfessorModel[])
              .subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(
                  (professor) => !this.selectionDelete.isSelected(professor)
                );
                this.selectionDelete.clear();

                this.router
                  .navigateByUrl('/', { skipLocationChange: true })
                  .then(() => {
                    this.router.navigate(['home-adm']);
                  });
              });
          } else if ('curso_id' in items[0]) {
            this.cursoService
              .deletarCursos(selectedItems as CursoModel[])
              .subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(
                  (curso) => !this.selectionDelete.isSelected(curso)
                );
                this.selectionDelete.clear();

                this.router
                  .navigateByUrl('/', { skipLocationChange: true })
                  .then(() => {
                    this.router.navigate(['home-adm']);
                  });
              });
          } else if ('aluno_id' in items[0]) {
            this.alunoService
              .deletarAlunos(selectedItems as AlunoModel[])
              .subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(
                  (aluno) => !this.selectionDelete.isSelected(aluno)
                );
                this.selectionDelete.clear();

                this.router
                  .navigateByUrl('/', { skipLocationChange: true })
                  .then(() => {
                    this.router.navigate(['home-adm']);
                  });
              });
          }
        }
      }
    }
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }

  validateAllSelected(
    selection: SelectionModel<CursoModel | ProfessorModel | AlunoModel>
  ) {
    if (!this.dataSource || !this.dataSource.data) {
      return false;
    }

    const numSelected = selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllEditSelected() {
    return this.selectionEdit.selected.length > 0;
  }

  isAllDeleteSelected() {
    return this.selectionDelete.selected.length > 0;
  }

  toggleAllRowsDelete() {
    if (this.isAllDeleteSelected()) {
      this.selectionDelete.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selectionEdit.isSelected(row)) {
        this.selectionDelete.select(row);
      }
    });
  }
  toggleAllRowsEdit() {
    if (this.selectionEdit.selected.length > 0) {
      this.selectionEdit.clear();
    }
  }

  onEditCheckboxChange(row: CursoModel | ProfessorModel | AlunoModel) {
    this.selectionEdit.clear();
    this.selectionEdit.select(row);
  }

  goBack() {
    this.router.navigate(['/home-adm']);
  }
  logout() {
    this.router.navigate(['/']);
  }
  enviarLista() {}
}
