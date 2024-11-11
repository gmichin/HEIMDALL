import { DisciplinaService } from './../services/disciplina.service';
import { SessionService } from './../services/session.service';
import { InteresseService } from './../services/interesse.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoModel } from 'src/app/models/curso.model';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaDisciplinasComponent } from 'src/app/tela-disciplinas/tela-disciplinas.component';
import { Router } from '@angular/router';
import { InteresseModel } from '../models/interesse.model';
import { AlunoModel } from '../models/aluno.model';
import { TurmaService } from '../services/turma.service';
@Component({
  selector: 'app-solicitar-interesse',
  templateUrl: './solicitar-interesse.component.html',
  styleUrl: './solicitar-interesse.component.scss',
})
export class SolicitarInteresseComponent implements OnInit {
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public interesseForm: FormGroup;
  public courses: CursoModel[] = [];
  public interesseToEdit: { valid: boolean; interesse: InteresseModel } = {
    valid: false,
    interesse: {} as InteresseModel,
  };

  public aluno = '';

  public turmaList: any[] = [];
  public errorMessage = { invalid: false, message: '' };

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
    private interesseService: InteresseService,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private router: Router
  ) {
    this.interesseToEdit = this.interesseService.getInteresseToEdit();
    this.interesseForm = this.fb.group({
      aluno_id: [
        this.interesseToEdit.valid
          ? this.interesseToEdit.interesse.aluno_id
          : '',
        [Validators.required],
      ],
      turma_id: [
        this.interesseToEdit.valid
          ? this.interesseToEdit.interesse.turma_id
          : false,
        [Validators.required],
      ],
    });
    this.aluno = this.dataAluno.nome;
    this.turmaService.getAllTurmas().subscribe({
      next: (turmas) => {
        this.turmaList = turmas;
        this.disciplinaService.getAllDisciplinas().subscribe({
          next: (disciplinas) => {
            this.turmaList.forEach((turma) => {
              const disciplinaCorrespondente = disciplinas.find(
                (disciplina) =>
                  disciplina.disciplina_id === turma.disciplina.disciplina_id
              );

              turma.cursoNome =
                (disciplinaCorrespondente as any)?.curso?.nome ||
                'Curso não informado';
            });
          },
          error: (err) => {
            console.error('Erro ao buscar disciplinas: ', err);
            this.errorMessage.message =
              'Não foi possível buscar as disciplinas.';
            this.errorMessage.invalid = true;
          },
        });

        if (turmas.length === 0) {
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
  ngOnInit(): void {}

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

  public save() {
    const interesse = new InteresseModel({
      aluno_id: this.dataAluno.aluno_id,
      turma_id: this.interesseForm.get('turma_id')?.value,
    });

    if (this.interesseToEdit.valid) {
      interesse.interesse_id = this.interesseToEdit.interesse.interesse_id;
      this.interesseService.atualizarInteresse(interesse).subscribe({
        next: (res) => {
          this.snackBar.open('Atualizado com sucesso!', '', {
            duration: 4000,
          });
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['home-student']);
            });
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
    this.interesseService.criarInteresse(interesse).subscribe({
      next: (res) => {
        this.snackBar.open('Cadastrado com sucesso!', '', {
          duration: 4000,
        });
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['home-student']);
          });
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
