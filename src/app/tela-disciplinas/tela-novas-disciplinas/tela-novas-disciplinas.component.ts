import { CursoService } from './../../services/curso.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { CursoModel } from 'src/app/models/curso.model';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaDisciplinasComponent } from '../tela-disciplinas.component';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { ProfessorModel } from 'src/app/models/professor.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-tela-novas-disciplinas',
  templateUrl: './tela-novas-disciplinas.component.html',
  styleUrl: './tela-novas-disciplinas.component.scss',
})
export class TelaNovasDisciplinasComponent implements OnInit {
  public disciplinaForm: FormGroup;
  public courses: CursoModel[] = [];
  public teachersList: ProfessorModel[] = [];
  public disciplinaToEdit!: { valid: boolean; disciplina: DisciplinaModel };
  public cursoList: CursoModel[] = [];
  public errorMessage = { invalid: false, message: '' };

  newSala: any[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private disciplinService: DisciplinaService,
    private cursoService: CursoService,
    private router: Router
  ) {
    this.disciplinaToEdit = this.disciplinService.getDisciplinaToEdit();

    this.disciplinaForm = this.fb.group({
      nome: [
        this.disciplinaToEdit.valid
          ? this.disciplinaToEdit.disciplina.nome
          : '',
        [Validators.required],
      ],
      descricao: [
        this.disciplinaToEdit.valid
          ? this.disciplinaToEdit.disciplina.descricao
          : '',
        [Validators.required],
      ],
      curso_id: [
        this.disciplinaToEdit.valid
          ? this.disciplinaToEdit.disciplina.curso_id
          : '',
        [Validators.required],
      ],
    });
  }
  ngOnInit(): void {
    this.cursoService.getAllCursos().subscribe({
      next: (cursos) => {
        this.cursoList = cursos;
        if (cursos.length == 0) {
          this.errorMessage.message =
            'Não foram encontrados cursos cadastrados.';
          this.errorMessage.invalid = true;
        }
      },
      error: (err) => {
        this.errorMessage.message = 'Não foi possível buscar os cursos.';
        this.errorMessage.invalid = true;
      },
    });
  }

  goHome() {
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

  public redirectHomeAdm() {
    this.router.navigate(['redirecionar']);
  }
  openReservas() {
    const dialogRef = this.dialog.open(TelaReservasComponent);

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
  opendisciplinas() {
    const dialogRef = this.dialog.open(TelaDisciplinasComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public save() {
    const disciplina = new DisciplinaModel({
      nome: this.disciplinaForm.get('nome')?.value,
      descricao: this.disciplinaForm.get('descricao')?.value,
      curso_id: this.disciplinaForm.get('curso_id')?.value,
    });

    if (this.disciplinaToEdit.valid) {
      disciplina.disciplina_id = this.disciplinaToEdit.disciplina.disciplina_id;
      this.disciplinService.atualizarDisciplina(disciplina).subscribe({
        next: (res) => {
          this.snackBar.open('Atualizado com sucesso!', '', {
            duration: 4000,
          });
          this.router.navigate(['home-adm']);
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a atualização, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['home-adm']);
        },
      });
      return;
    } else {
      this.disciplinService.criarDisciplina(disciplina).subscribe({
        next: (res) => {
          this.snackBar.open('Cadastrado com sucesso!', '', {
            duration: 4000,
          });
          this.router.navigate(['home-adm']);
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante o cadastro, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['home-adm']);
        },
      });
    }
  }
}
