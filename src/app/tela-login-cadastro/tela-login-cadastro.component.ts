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
import { getUserRequest } from '../models/login.model';
import { RegisterUserRequest } from '../models/register.models';
import { LoginUserService } from './../services/login-user.service';
import { RegisterUserService } from './../services/register-user.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login-cadastro.component.html',
  styleUrls: ['./tela-login-cadastro.component.scss'],
})
export class TelaLoginCadastroComponent {
  public resgiterForm: FormGroup;
  public loginForm: FormGroup;
  public foco: number = 0;
  private message: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<TelaLoginCadastroComponent>,
    private fb: FormBuilder,
    private registerUserService: RegisterUserService,
    private loginUserService: LoginUserService
  ) {
    this.resgiterForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, this.emailValidator]],
        password: ['', [Validators.required], Validators.minLength(6)],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.resgiterForm.invalid) {
      return;
    }
    this.registerUserService
      .register(
        new RegisterUserRequest({
          name: this.resgiterForm.get('nome')?.value,
          email: this.resgiterForm.get('email')?.value,
          encrypted_password: this.resgiterForm.get('password')?.value,
          role_id: '0',
        })
      )
      .subscribe(
        (res) => {
          this.snackBar.open(`Cadastrado com sucesso.`, '', {
            duration: 1000,
          });
          this.foco = 0;
          this.resetForms(this.resgiterForm);
        },
        (err) => {
          this.snackBar.open(`Ocorreu um erro durante sua solicitação.`, '', {
            duration: 1000,
          });
          this.resetForms(this.resgiterForm);
        }
      );
  }

  login() {
    this.dialogRef.close('close');
    this.router.navigate(['redirecionar']);
    return;
    if (this.loginForm.invalid) {
      this.snackBar.open('Por favor, revise os campos.', '', {
        duration: 1000,
      });
      return;
    }

    this.loginUserService
      .login(
        new getUserRequest({
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value,
        })
      )
      .subscribe(
        (res) => {
          setTimeout(() => {
            this.snackBar.open(`Bem vindo, ${res.username}!`, '', {
              duration: 1000,
            });
            this.router.navigate(['redirecionar']);
            this.dialogRef.close('close');
          }, 1500);
          this.resetForms(this.resgiterForm);
        },
        (err) => {
          this.snackBar.open(`Usuário não cadastrado.`, '', {
            duration: 1000,
          });
        }
      );
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
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
