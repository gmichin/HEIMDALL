import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoModel } from 'src/app/models/curso.model';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { ProfessorModel } from 'src/app/models/professor.model';
import { TurmaModel } from 'src/app/models/turma.model';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-tela-novas-turmas',
  templateUrl: './tela-novas-turmas.component.html',
  styleUrl: './tela-novas-turmas.component.scss',
})
export class TelaNovasTurmasComponent implements OnInit {
  public turmaForm: FormGroup;
  public courses: CursoModel[] = [];
  public teachersList: ProfessorModel[] = [];
  public turmaToEdit!: { valid: boolean; turma: TurmaModel };

  newSala: any[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private turmaService: TurmaService,
    private router: Router
  ) {
    this.turmaToEdit = this.turmaService.getTurmaToEdit();

    this.turmaForm = this.fb.group({
      professor_id: ['', [Validators.required]],
      disciplina_id: ['', [Validators.required]],
      periodo: ['', [Validators.required]],
      aluno_id: ['', [Validators.required]],
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

  public save() {
    const turma = new TurmaModel({
      professor_id: this.turmaForm.get('professor_id')?.value,
      disciplina_id: this.turmaForm.get('disciplina_id')?.value,
      periodo: this.turmaForm.get('periodo')?.value,
      aluno_id: this.turmaForm.get('aluno_id')?.value,
    });

    if (this.turmaToEdit.valid) {
      turma.turma_id = this.turmaToEdit.turma.turma_id;
      this.turmaService.atualizarTurmas(turma).subscribe({
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
    this.turmaService.criarTurma(turma).subscribe({
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
