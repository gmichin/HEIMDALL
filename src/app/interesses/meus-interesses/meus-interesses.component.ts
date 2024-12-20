import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { SessionService } from 'src/app/services/session.service';
import { InteresseModel } from 'src/app/models/interesse.model';
import { InteresseService } from 'src/app/services/interesse.service';
import { TurmaService } from 'src/app/services/turma.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { AlunoModel } from 'src/app/models/aluno.model';
@Component({
  selector: 'app-meus-interesses',
  templateUrl: './meus-interesses.component.html',
  styleUrl: './meus-interesses.component.scss',
})
export class MeusInteressesComponent {
  displayedColumns: string[] = [
    'edit',
    'remove',
    'curso',
    'disciplina',
    'periodo',
    'professor',
  ];
  dataSource = new MatTableDataSource<InteresseModel>();
  selection = new SelectionModel<InteresseModel>(true, []);
  selectionReject = new SelectionModel<InteresseModel>(true, []);

  public dataInteresse = <InteresseModel>(
    this.sessionService.getSessionData('interesse').retorno
  );
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  constructor(
    public dialog: MatDialog,
    private interesseService: InteresseService,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.interesseService.getAllInteresses().subscribe({
      next: (interesses) => {
        const interessesFiltrados = interesses.filter(
          (interesse: any) =>
            interesse.aluno.aluno_id === this.dataAluno.aluno_id
        );

        const turmaInteresseMap = interessesFiltrados.reduce(
          (map: any, interesse: any) => {
            map[interesse.turma.turma_id] = {
              interesse_id: interesse.interesse_id,
              aluno: interesse.aluno,
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
                console.log(this.dataSource.data);
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

  goBack() {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editSala() {
    this.interesseService.saveInteresseToEdit(this.selection.selected[0]);
  }

  apagarSalas() {
    const interessesSelecionadas = this.selectionReject.selected;

    if (interessesSelecionadas.length > 0) {
      this.interesseService
        .deleteInteresse(interessesSelecionadas)
        .subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (interesse) => !this.selectionReject.isSelected(interesse)
          );
          this.selectionReject.clear();

          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['meus-interesses']);
            });
        });
    } else {
      alert('Selecione pelo menos uma sala para excluir.');
    }
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
