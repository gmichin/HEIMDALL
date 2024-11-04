import { DisciplinaService } from 'src/app/services/disciplina.service';
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
    'alunos',
    'disciplina',
    'periodo',
  ];
  dataSource = new MatTableDataSource<TurmaModel>();
  selectionCourse = new SelectionModel<string>(true, []);
  selection = new SelectionModel<TurmaModel>(true, []);
  selectionReject = new SelectionModel<TurmaModel>(true, []);
  public form: FormGroup;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private turmaService: TurmaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group(
      {
        professor: ['', [Validators.required]],
        alunos: ['', [Validators.required]],
        disciplina: ['', [Validators.required]],
        periodo: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );

    this.turmaService.getAllTurmas().subscribe({
      next: (turmas) => {
        this.dataSource.data = turmas;
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

  editDisciplinas() {
    this.turmaService.salvarTurmaToEdit(this.selection.selected[0]);
  }

  apagarDisciplinas() {
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

  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');

    if (senha?.value !== confirmarSenha?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
