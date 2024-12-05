import { ProfessorService } from 'src/app/services/professor.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginUserService } from '../services/login.service';
import { ProfessorModel } from '../models/professor.model';
import { AlunoModel } from '../models/aluno.model';
import { SessionService } from '../services/session.service'; // Importando o SessionService
import { url_config } from '../url.config';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-confirmacao-email.component.html',
  styleUrls: ['./tela-confirmacao-email.component.scss'],
})
export class TelaConfirmacaoEmailComponent {
  public loginForm: FormGroup;
  public foco: number = 0;
  desabilitado = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<TelaConfirmacaoEmailComponent>,
    private fb: FormBuilder,
    private loginUserService: LoginUserService,
    private sessionService: SessionService,
    private alunoService: AlunoService,
    private professorService: ProfessorService
  ) {

    this.loginForm = this.fb.group({
      code: ['', [Validators.required]],
    });
  }

  resend(){
    const session = this.sessionService.getSessionData('aluno').valido ? 
    {user: this.sessionService.getSessionData('aluno').retorno, isAluno: true} : {user: this.sessionService.getSessionData('professor').retorno, isAluno: false};

    if(session.isAluno){
      this.alunoService.criarAluno(session.user as AlunoModel).subscribe((res: any)=> this.snackBar.open(res.message, '', {
        duration: 5000,
      }));
      return;
    }
    this.professorService.criarProfessor(session.user as ProfessorModel).subscribe((res: any)=> this.snackBar.open(res.message, '', {
      duration: 5000,
    }));
  }

  

  cadastroProfessorAdm() {
    if (this.loginForm.invalid) {
      this.snackBar.open(`revise os campos.`, '', {
        duration: 5000,
      });
      return;
    }

    this.desabilitado=true;

    const session = this.sessionService.getSessionData('aluno').valido ? 
    {user: this.sessionService.getSessionData('aluno').retorno as AlunoModel, isAluno: true} : {user: this.sessionService.getSessionData('professor').retorno as ProfessorModel, isAluno: false}
    const request = {
        email: session.user.email as string,
        code : this.loginForm.get('code')?.value,
    }

    const url = `${session.isAluno ? url_config.url_aluno : url_config.url_professor}/complete-registration`;

    this.professorService.sendCodeEmail(request, url).subscribe({
      next: () => {
        this.snackBar.open(
          `Cadastro realizado, aguardando aprovação do administrador`,
          '',
          {
            duration: 5000,
          }
        );
        this.dialogRef.close('cadastro');
        sessionStorage.clear();
      },
      error: (err) => {
        this.snackBar.open(err.error.message ? err.error.message : `Ocorreu um erro durante sua solicitação.`, '', {
          duration: 5000,
        });
        this.desabilitado=false;
        sessionStorage.clear();
      },
    });
  }
  }
