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

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login-cadastro.component.html',
  styleUrls: ['./tela-login-cadastro.component.scss'],
})
export class TelaLoginCadastroComponent {
  public cadastroAlunoForm: FormGroup;
  public cadastroProfessorAdmForm: FormGroup;
  public loginForm: FormGroup;
  public foco: number = 0;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<TelaLoginCadastroComponent>,
    private fb: FormBuilder,
    private loginUserService: LoginUserService,
    private sessionService: SessionService,
    private alunoService: AlunoService,
    private professorService: ProfessorService
  ) {
    this.cadastroAlunoForm = this.fb.group(
      {
        nome: ['', Validators.required],
        email: ['', [Validators.required, this.emailValidator]],
        senha: ['', Validators.required],
        confirmarSenha: ['', Validators.required],
        registro: ['', Validators.required],
        ano_entrada: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.cadastroProfessorAdmForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, this.emailValidator]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]],
        registro: ['', [Validators.required]],
        adm: [false],
      },
      { validator: this.passwordMatchValidator }
    );

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  cadastroAluno() {
    if (this.cadastroAlunoForm.invalid) {
      this.snackBar.open(`Cadastro inválido, revise os campos.`, '', {
        duration: 5000,
      });
      return;
    }
    const request = new AlunoModel({
      nome: this.cadastroAlunoForm.get('nome')?.value,
      email: this.cadastroAlunoForm.get('email')?.value,
      senha: this.cadastroAlunoForm.get('senha')?.value,
      registro: this.cadastroAlunoForm.get('registro')?.value,
      ano_entrada: this.cadastroAlunoForm.get('ano_entrada')?.value,
      status: false,
    });
    this.alunoService.criarAluno(request).subscribe({
      next: () => {
        this.sessionService.setItem('aluno', request);
        this.snackBar.open(
          `Cadastro realizado, há a possibilidade do adm não permitir que a conta seja mantida.`,
          '',
          {
            duration: 5000,
          }
        );
        this.dialogRef.close('cadastro');
      },
      error: (err) => {
        this.snackBar.open(err.error.message ? err.error.message : `Ocorreu um erro durante sua solicitação.`, '', {
          duration: 2000,
        });
      },
    });
  }

  cadastroProfessorAdm() {
    if (this.cadastroProfessorAdmForm.invalid) {
      this.snackBar.open(`Cadastro inválido, revise os campos.`, '', {
        duration: 5000,
      });
      return;
    }
    const request = new ProfessorModel({
      nome: this.cadastroProfessorAdmForm.get('nome')?.value,
      email: this.cadastroProfessorAdmForm.get('email')?.value,
      senha: this.cadastroProfessorAdmForm.get('senha')?.value,
      registro: this.cadastroProfessorAdmForm.get('registro')?.value,
      adm: this.cadastroProfessorAdmForm.get('adm')?.value,
      status: false,
    });
    this.professorService.criarProfessor(request).subscribe({
      next: () => {
        this.sessionService.setItem('professor', request);
        this.snackBar.open(
          `Cadastro realizado, há a possibilidade do adm não permitir que a conta seja mantida.`,
          '',
          {
            duration: 5000,
          }
        );
        this.dialogRef.close('cadastro');
      },
      error: (err) => {
        this.snackBar.open(err.error.message ? err.error.message : `Ocorreu um erro durante sua solicitação.`, '', {
          duration: 2000,
        });
      },
    });
  }
  login() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Por favor, revise os campos.', '', {
        duration: 2000,
      });
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const senha = this.loginForm.get('senha')?.value;

    this.loginUserService.login(email, senha).subscribe(
      (res) => {
        if (res) {
          const usuario = res.user;

          /* if (this.isProfessorModel(usuario)) {
            this.sessionService.setItem('professor', usuario);
            this.router.navigate(['redirecionar']);
          } else if (this.isAlunoModel(usuario)) {
            this.sessionService.setItem('aluno', usuario);
            this.router.navigate(['redirecionar']);
          } */
          this.router.navigate(['redirecionar']);
          this.dialogRef.close('close');

          setTimeout(() => {
            this.snackBar.open(`Bem-vindo, ${usuario.nome}!`, '', {
              duration: 3000,
            });
            this.resetForms(this.loginForm);
          }, 1500);
        } else {
          this.snackBar.open(`Usuário não encontrado.`, '', {
            duration: 1000,
          });
        }
      },
      (err) => {
        this.snackBar.open(err.error.message ? err.error.message : `Erro no login.`, '', {
          duration: 1000,
        });
      }
    );
  }

  private isProfessorModel(obj: any): obj is ProfessorModel {
    return obj && typeof obj.adm !== 'undefined' && obj.status == true;
  }

  private isAlunoModel(obj: any): obj is AlunoModel {
    return obj && typeof obj.ano_entrada !== 'undefined' && obj.status == true;
  }

  private resetForms(form: FormGroup): void {
    form.reset();

    Object.keys(form.controls).forEach((controlName) => {
      const control = form.get(controlName);
      control?.setErrors(null);
      control?.markAsUntouched();
    });
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
