import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginUserService } from '../services/login.service';
import { CadastroService } from '../services/cadastros.service';
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
    private cadastroService: CadastroService,
    private loginUserService: LoginUserService,
    private sessionService: SessionService // Adicionando o SessionService
  ) {
    this.cadastroAlunoForm = this.fb.group(
      {
        aluno_id: ['', [Validators.required]],
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, this.emailValidator]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]],
        registro: ['', [Validators.required]],
        ano_entrada: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );

    this.cadastroProfessorAdmForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, this.emailValidator]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]],
        registro: ['', [Validators.required]],
        adm: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  solicitacaoCadastro() {
    if (this.cadastroAlunoForm.invalid) {
      return;
    }
    const request = new AlunoModel({
      nome: this.cadastroAlunoForm.get('nome')?.value,
      email: this.cadastroAlunoForm.get('email')?.value,
      senha: this.cadastroAlunoForm.get('senha')?.value,
      registro: this.cadastroAlunoForm.get('registro')?.value,
      ano_entrada: this.cadastroAlunoForm.get('ano_entrada')?.value,
    });
    this.cadastroService.convidarEstudante(request).subscribe({
      next: () => {
        this.snackBar.open(
          `Solicitação enviada com sucesso, aguarde análise.`,
          '',
          {
            duration: 5000,
          }
        );
      },
      error: () => {
        this.snackBar.open(`Ocorreu um erro durante sua solicitação.`, '', {
          duration: 2000,
        });
      },
    });
  }

  cadastro() {
    if (this.cadastroProfessorAdmForm.invalid) {
      return;
    }
    this.cadastroService
      .cadastroAdmProfessor(
        new ProfessorModel({
          nome: this.cadastroProfessorAdmForm.get('nome')?.value,
          email: this.cadastroProfessorAdmForm.get('email')?.value,
          senha: this.cadastroProfessorAdmForm.get('password')?.value,
          registro: this.cadastroProfessorAdmForm.get('registro')?.value,
          adm: this.cadastroProfessorAdmForm.get('adm')?.value,
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(`Cadastrado com sucesso.`, '', {
            duration: 2000,
          });
          this.foco = 0;
          this.resetForms(this.cadastroProfessorAdmForm);
        },
        error: (err) => {
          this.snackBar.open(`Ocorreu um erro durante sua solicitação.`, '', {
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

          if (this.isProfessorModel(usuario)) {
            this.sessionService.setItem('professor', usuario);
            this.router.navigate(['redirecionar']);
          } else if (this.isAlunoModel(usuario)) {
            this.sessionService.setItem('aluno', usuario);
            this.router.navigate(['redirecionar']);
          }
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
        this.snackBar.open(`Erro no login.`, '', {
          duration: 1000,
        });
      }
    );
  }

  private isProfessorModel(obj: any): obj is ProfessorModel {
    return obj && typeof obj.adm !== 'undefined';
  }

  private isAlunoModel(obj: any): obj is AlunoModel {
    return obj && typeof obj.ano_entrada !== 'undefined';
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
