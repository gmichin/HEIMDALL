import { DisciplinaService } from 'src/app/services/disciplina.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { ProfessorModel } from 'src/app/models/professor.model';
import { TurmaModel } from 'src/app/models/turma.model';
import { TurmaService } from 'src/app/services/turma.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { AlunoModel } from 'src/app/models/aluno.model';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-tela-novas-turmas',
  templateUrl: './tela-novas-turmas.component.html',
  styleUrl: './tela-novas-turmas.component.scss',
})
export class TelaNovasTurmasComponent implements OnInit {
  public turmaForm: FormGroup;
  public teachersList: ProfessorModel[] = [];
  public turmaToEdit!: { valid: boolean; turma: TurmaModel };

  public errorMessage = { invalid: false, message: '' };

  public professorList: ProfessorModel[] = [];
  public disciplinaList: DisciplinaModel[] = [];
  public alunoList: AlunoModel[] = [];

  newSala: any[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private turmaService: TurmaService,
    private router: Router,
    private professorService: ProfessorService,
    private disciplinaService: DisciplinaService,
    private alunoService: AlunoService
  ) {
    this.turmaToEdit = this.turmaService.getTurmaToEdit();

    this.turmaForm = this.fb.group({
      professor_id: ['', [Validators.required]],
      disciplina_id: ['', [Validators.required]],
      periodo: ['', [Validators.required]],
      aluno_ids: this.fb.array([
        this.fb.group({ aluno_id: ['', Validators.required] }),
      ]),
    });
  }
  ngOnInit(): void {
    this.professorService.getAllProfessores().subscribe({
      next: (professores) => {
        this.professorList = professores;
        if (professores.length == 0) {
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
    this.disciplinaService.getAllDisciplinas().subscribe({
      next: (disciplinas) => {
        this.disciplinaList = disciplinas;
        if (disciplinas.length == 0) {
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
    this.alunoService.getAllAlunos().subscribe({
      next: (alunos) => {
        this.alunoList = alunos;
        if (alunos.length == 0) {
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

  get alunoControls() {
    return this.turmaForm.get('aluno_ids') as FormArray;
  }

  addAluno() {
    this.alunoControls.push(
      this.fb.group({ aluno_id: ['', Validators.required] })
    );
  }

  removeAluno(index: number) {
    this.alunoControls.removeAt(index);
  }

  public save() {
    const formValues = this.turmaForm.value;
    const alunoIds = formValues.aluno_ids.map((aluno: any) => aluno.aluno_id);

    const turma = {
      professor_id: formValues.professor_id,
      disciplina_id: formValues.disciplina_id,
      periodo: formValues.periodo,
      aluno_ids: alunoIds,
    };

    if (this.turmaToEdit.valid) {
      // Lógica de atualização
    } else {
      this.turmaService.criarTurma(turma).subscribe({
        next: () => {
          this.snackBar.open('Cadastrado com sucesso!', '', { duration: 4000 });
          this.router.navigate(['home-adm']);
        },
        error: () => {
          this.snackBar.open(
            'Ocorreu um erro durante o cadastro, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
        },
      });
    }
  }
}
