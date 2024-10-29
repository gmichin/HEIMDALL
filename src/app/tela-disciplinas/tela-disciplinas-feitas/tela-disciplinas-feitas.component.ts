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
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tela-disciplinas-feitas',
  templateUrl: './tela-disciplinas-feitas.component.html',
  styleUrls: ['./tela-disciplinas-feitas.component.scss'],
})
export class TelaDisciplinasFeitasComponent {
  displayedColumns: string[] = ['remove', 'edit', 'nome', 'descricao'];
  dataSource = new MatTableDataSource<DisciplinaModel>();
  selectionCourse = new SelectionModel<string>(true, []);
  selection = new SelectionModel<DisciplinaModel>(true, []);
  selectionReject = new SelectionModel<DisciplinaModel>(true, []);
  disciplinasList!: DisciplinaModel[];
  public form: FormGroup;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private disciplinaService: DisciplinaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group(
      {
        nome: ['', [Validators.required]],
        descricao: ['', [Validators.required, this.emailValidator]],
        curso_id: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );

    this.disciplinaService.getAllDisciplinas().subscribe({
      next: (disciplinas) => {
        this.disciplinasList = disciplinas;
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

  openReservas() {
    const dialogRef = this.dialog.open(TelaReservasComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDisciplinas() {
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
          this.router.navigate(['tela-disciplinas-feitas']);
        },
      });
  }

  @ViewChild(MatTable)
  table!: MatTable<DisciplinaModel>;

  editDisciplinas() {
    this.disciplinaService.salvarDisciplinaToEdit(this.selection.selected[0]);
  }

  apagarDisciplinas() {
    this.disciplinaService
      .deletarDisciplina(this.selectionReject.selected)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Removida(s) com sucesso!', '', {
            duration: 4000,
          });
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['tela-disciplinas-feitas']);
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
              this.router.navigate(['tela-disciplinas-feitas']);
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

  private emailValidator(control: any) {
    const value = control.value;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (value && !pattern.test(value)) {
      return { email: true };
    }
    return null;
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
