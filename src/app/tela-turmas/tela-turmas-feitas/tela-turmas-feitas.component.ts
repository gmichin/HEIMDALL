import { DisciplinaService } from './../../services/disciplina.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TurmaModel } from 'src/app/models/turma.model';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-tela-turmas-feitas',
  templateUrl: './tela-turmas-feitas.component.html',
  styleUrl: './tela-turmas-feitas.component.scss',
})
export class TelaTurmasFeitasComponent {
  displayedColumns: string[] = [
    'remove',
    'edit',
    'professor',
    'disciplina',
    'curso',
    'periodo',
    'aluno_ids',
  ];
  dataSource = new MatTableDataSource<TurmaModel>();
  selectionCourse = new SelectionModel<string>(true, []);
  selection = new SelectionModel<TurmaModel>(true, []);
  selectionReject = new SelectionModel<TurmaModel>(true, []);
  public form: FormGroup;

  disciplinasCurso: any[] = [];

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      professor_id: ['', [Validators.required]],
      disciplina_id: ['', [Validators.required]],
      periodo: ['', [Validators.required]],
      aluno_ids: this.fb.array([
        this.fb.group({ aluno_id: ['', Validators.required] }),
      ]),
    });

    this.turmaService.getAllTurmas().subscribe({
      next: (turmas) => {
        this.disciplinaService.getAllDisciplinas().subscribe({
          next: (disciplinas) => {
            disciplinas.forEach((disciplina: any) => {
              if (disciplina.disciplina_id !== undefined) {
                this.disciplinasCurso.push(disciplina);
              }
            });

            turmas.forEach((turma: any) => {
              const disciplina_id = turma.disciplina.disciplina_id;
              if (disciplina_id !== undefined) {
                const disciplinaEncontrada = this.disciplinasCurso.find(
                  (disciplina: any) =>
                    disciplina.disciplina_id === disciplina_id
                );

                if (disciplinaEncontrada) {
                  turma.disciplina = {
                    nome: disciplinaEncontrada.nome,
                    descricao: disciplinaEncontrada.descricao,
                    curso_nome: disciplinaEncontrada.curso.nome,
                  };
                } else {
                  console.log('Disciplina não encontrada para esta turma');
                }
              }
            });

            this.dataSource.data = turmas;
            console.log(this.dataSource.data);
          },
        });
      },
    });
  }

  goBack() {
    this.router.navigate(['/home-adm']);
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

  @ViewChild(MatTable)
  table!: MatTable<DisciplinaModel>;

  editTurmas() {
    this.turmaService.salvarTurmaToEdit(this.selection.selected[0]);
  }

  apagarTurmas() {
    this.turmaService.deletarTurma(this.selectionReject.selected).subscribe({
      next: (res) => {
        this.snackBar.open('Removida(s) com sucesso!', '', {
          duration: 4000,
        });
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['tela-turmas-feitas']);
          });
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante a solicitação, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 4000,
          }
        );
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['tela-turmas-feitas']);
          });
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
