import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { CursoModel } from 'src/app/models/curso.model';
import { SessionService } from 'src/app/services/session.service';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaDisciplinasComponent } from '../tela-disciplinas.component';
import { InternsService } from 'src/app/services/interns.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { ProfessorModel } from 'src/app/models/professor.model';
import { AlunoModel } from 'src/app/models/aluno.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-tela-novas-disciplinas',
  templateUrl: './tela-novas-disciplinas.component.html',
  styleUrl: './tela-novas-disciplinas.component.scss',
})
export class TelaNovasDisciplinasComponent implements OnInit {
  public ProfessorAdmForm: FormGroup;
  public AlunoForm: FormGroup;
  public courses: CursoModel[] = [];
  public teachersList: ProfessorModel[] = [];
  public disciplinaToEdit!: { valid: boolean; class: DisciplinaModel };

  newSala: any[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private disciplinService: DisciplinaService,
    private router: Router
  ) {
    this.disciplinaToEdit = this.disciplinService.getDisciplinaToEdit();

    this.ProfessorAdmForm = this.fb.group({
      nome: [
        this.disciplinaToEdit.valid ? this.disciplinaToEdit.class.nome : '',
        [Validators.required],
      ],
      descricao: [
        this.disciplinaToEdit.valid
          ? this.disciplinaToEdit.class.descricao
          : '',
        [Validators.required],
      ],
    });
    this.AlunoForm = this.fb.group({
      nome: [
        this.disciplinaToEdit.valid ? this.disciplinaToEdit.class.nome : '',
        [Validators.required],
      ],
      description: [
        this.disciplinaToEdit.valid
          ? this.disciplinaToEdit.class.descricao
          : '',
        [Validators.required],
      ],
    });
  }
  ngOnInit(): void {}

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
      nome: this.ProfessorAdmForm.get('nome')?.value,
      descricao: this.ProfessorAdmForm.get('descricao')?.value,
    });

    if (this.disciplinaToEdit.valid) {
      disciplina.disciplina_id = this.disciplinaToEdit.class.disciplina_id;
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
    }
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
