import { DisciplinaService } from './../../services/disciplina.service';
import { TurmaService } from './../../services/turma.service';
import { InteresseService } from './../../services/interesse.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlunoModel } from 'src/app/models/aluno.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { InteresseModel } from 'src/app/models/interesse.model';

@Component({
  selector: 'app-validar-interesse',
  templateUrl: './validar-interesse.component.html',
  styleUrl: './validar-interesse.component.scss',
})
export class ValidarInteresseComponent implements OnInit {
  displayedColumns: string[] = [
    'APROVE',
    'REJEITE',
    'curso',
    'disciplina',
    'periodo',
    'professor',
    'aluno',
  ];

  dataSource: MatTableDataSource<InteresseModel> =
    new MatTableDataSource<InteresseModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectionAprove = new SelectionModel<InteresseModel>(true, []);
  selectionReject = new SelectionModel<InteresseModel>(true, []);

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private interesseService: InteresseService,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private router: Router
  ) {
    this.interesseService.getAllInteresses().subscribe({
      next: (interesses) => {
        const turmaInteresseMap = interesses.reduce(
          (map: any, interesse: any) => {
            map[interesse.turma.turma_id] = {
              interesse_id: interesse.interesse_id,
              aluno: interesse.aluno, // Inclui o aluno de interesse
            };
            return map;
          },
          {}
        );

        this.turmaService.getAllTurmas().subscribe({
          next: (turmas) => {
            this.disciplinaService.getAllDisciplinas().subscribe({
              next: (disciplinas) => {
                const turmaComDados = turmas
                  .filter((turma: any) =>
                    turmaInteresseMap.hasOwnProperty(turma.turma_id)
                  )
                  .map((turma: any) => {
                    const disciplinaCorrespondente = disciplinas.find(
                      (disciplina: any) =>
                        disciplina.disciplina_id ===
                        turma.disciplina.disciplina_id
                    );

                    return {
                      turma_id: turma.turma_id,
                      interesse_id:
                        turmaInteresseMap[turma.turma_id].interesse_id,
                      professor: turma.professor,
                      periodo: turma.periodo,
                      disciplina: disciplinaCorrespondente,
                      aluno: turmaInteresseMap[turma.turma_id].aluno,
                    };
                  });

                this.dataSource.data = turmaComDados;
              },
              error: (err) => {
                console.error('Erro ao buscar disciplinas: ', err);
              },
            });
          },
          error: (err) => {
            console.error('Erro ao buscar turmas: ', err);
          },
        });
      },
      error: (err) => {
        console.error('Erro ao buscar interesses: ', err);
      },
    });
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
      if (request && request.interesse_id) {
        this.turmaService.aprovarInteresse(request).subscribe({
          next: (res) => {
            this.snackBar.open('Atualizado com sucesso!', '', {
              duration: 4000,
            });
            this.interesseService.deleteInteressePorId(request).subscribe({
              next: () => {
                console.log('Interesse removido com sucesso!');
              },
              error: (err) => {
                console.error('Erro ao remover interesse:', err);
              },
            });

            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['validar-interesse']);
              });
          },
          error: (err) => {
            this.snackBar.open(
              'Ocorreu um erro durante a atualização, por favor, tente novamente mais tarde.',
              '',
              { duration: 4000 }
            );
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['validar-interesse']);
              });
          },
        });
      } else {
        console.error('O request não contém interesse_id:', request);
      }
    });

    const toDelete = Array.isArray(this.selectionReject.selected)
      ? this.selectionReject.selected.map((request) => request)
      : [];

    if (toDelete.length > 0) {
      this.interesseService.deleteInteresse(toDelete).subscribe({
        next: (res) => {
          this.snackBar.open('Removido(s) com sucesso!', '', {
            duration: 4000,
          });
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['validar-interesse']);
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
              this.router.navigate(['validar-interesse']);
            });
        },
      });
    }
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }

  validateAllSelected(selection: SelectionModel<InteresseModel>) {
    const numSelected = selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllAproveSelected() {
    return this.selectionAprove.selected.length > 0;
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }

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
