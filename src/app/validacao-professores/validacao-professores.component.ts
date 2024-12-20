import { ProfessorService } from 'src/app/services/professor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaPerfilComponent } from '../tela-perfil/tela-perfil.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfessorModel } from '../models/professor.model';

@Component({
  selector: 'app-validacao-professores',
  templateUrl: './validacao-professores.component.html',
  styleUrl: './validacao-professores.component.scss',
})
export class ValidacaoProfessoresComponent implements OnInit {
  displayedColumns: string[] = [
    'APROVE',
    'REJEITE',
    'registro',
    'nome',
    'email',
  ];

  dataSource: MatTableDataSource<ProfessorModel> =
    new MatTableDataSource<ProfessorModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectionAprove = new SelectionModel<ProfessorModel>(true, []);
  selectionReject = new SelectionModel<ProfessorModel>(true, []);

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private professorService: ProfessorService,
    private router: Router
  ) {
    this.professorService.getAllProfessores().subscribe(
      (dataProfessores: ProfessorModel[]) => {
        const professoresFiltrados = dataProfessores.filter(
          (professor) => !professor.adm && professor.status == false
        );

        this.dataSource = new MatTableDataSource<ProfessorModel>(
          professoresFiltrados
        );
      },
      (error) => {
        console.error('Erro ao carregar dados dos alunos:', error);
      }
    );
  }

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
  ngOnInit() {}

  public enviarLista() {
    this.selectionAprove.selected.forEach((request) => {
      request.status = true;
      this.professorService.atualizarProfessor(request).subscribe({
        next: (res) => {
          this.snackBar.open('Atualizado com sucesso!', '', {
            duration: 4000,
          });
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['validacao-professores']);
            });
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a atualização, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['validacao-professores']);
            });
        },
      });
    });

    const toDelete = this.selectionReject.selected.map((request) => {
      return request;
    });

    this.professorService.deletarProfessores(toDelete).subscribe({
      next: (res) => {
        this.snackBar.open('Removido(s) com sucesso!', '', {
          duration: 4000,
        });
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['validacao-professores']);
          });
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante a solicitação, por favor, tente novamente mais tarde.',
          '',
          { duration: 4000 }
        );
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['validacao-professores']);
          });
      },
    });
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }

  validateAllSelected(selection: SelectionModel<ProfessorModel>) {
    const numSelected = selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllAproveSelected() {
    return this.selectionAprove.selected.length > 0;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRowsAprove() {
    if (this.isAllAproveSelected()) {
      this.selectionAprove.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selectionReject.isSelected(row)) {
        this.selectionAprove.select(row);
      }
    });
  }
  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selectionAprove.isSelected(row)) {
        this.selectionReject.select(row);
      }
    });
  }
  goBack() {
    this.router.navigate(['/home-adm']);
  }

  logout() {
    this.router.navigate(['/']);
  }
}
