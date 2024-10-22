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
  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public idProfessorAdm = this.dataProfessorAdm.professor_id;
  public idAluno = this.dataAluno.aluno_id;
  public tipoUsuario = '';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cursoService: CursoService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
    private internsService: InternsService,
    private disciplinService: DisciplinaService,
    private router: Router
  ) {
    switch (this.dataProfessorAdm.adm) {
      case true:
        this.tipoUsuario = 'Administrador';
        break;
      case false:
        this.tipoUsuario = 'Professor';
        break;
    }
    if (this.dataAluno) this.tipoUsuario = 'Aluno';
    this.disciplinaToEdit = this.disciplinService.getDisciplinaToEdit();

    this.ProfessorAdmForm = this.fb.group({
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
  ngOnInit(): void {
    this.internsService.getAllTeachers().subscribe({
      next: (res) => {
        this.teachersList = res;
        if (res.length == 0) {
          this.snackBar.open(
            'Ocorreu um erro durante a busca dos professores, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
        }
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante a busca dos professores, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 2000,
          }
        );
      },
    });

    this.cursoService.getAllCursos().subscribe({
      next: (res) => {
        this.courses = res;
        if (res.length == 0) {
          this.snackBar.open(
            'Ocorreu um erro durante a busca dos cursos, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
        }
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante a busca dos cursos, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  goHome() {
    if (this.tipoUsuario == 'Administrador')
      this.router.navigate(['/home-adm']);
    else if (this.tipoUsuario == 'Professor')
      this.router.navigate(['/home-teacher']);
    else if (this.tipoUsuario == 'Aluno')
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
  openMaterias() {
    const dialogRef = this.dialog.open(TelaDisciplinasComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public save() {
    const instituition_id =
      this.sessionService.getSessionData<string>('idInstitution').retorno;

    const materia = new DisciplinaModel({
      nome: this.ProfessorAdmForm.get('nome')?.value,
      descricao: this.ProfessorAdmForm.get('descricao')?.value,
    });

    if (this.disciplinaToEdit.valid) {
      materia.disciplina_id = this.disciplinaToEdit.class.disciplina_id;
      this.disciplinService.atualizarDisciplina(materia).subscribe({
        next: (res) => {
          this.snackBar.open('Atualizado com sucesso!', '', {
            duration: 4000,
          });
          this.router.navigate(['tela-novas-materias']);
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a atualização, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
        },
      });
      return;
    }
    this.disciplinService.criarDisciplina(materia).subscribe({
      next: (res) => {
        this.snackBar.open('Cadastrado com sucesso!', '', {
          duration: 4000,
        });
        this.router.navigate(['tela-novas-materias']);
      },
      error: (err) => {
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
