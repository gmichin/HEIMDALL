import { ProfessorService } from 'src/app/services/professor.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CadastroService } from 'src/app/services/cadastros.service';
import { TelaCreateAlunoComponent } from '../tela-create-aluno/tela-create-aluno.component';
import { ProfessorModel } from 'src/app/models/professor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-create-teacher',
  templateUrl: './tela-create-teacher.component.html',
  styleUrls: ['./tela-create-teacher.component.scss'],
})
export class TelaCreateTeacherComponent implements OnInit {
  public cadastroProfessorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private professorService: ProfessorService,
    public dialogRef: MatDialogRef<TelaCreateAlunoComponent>
  ) {
    this.cadastroProfessorForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, this.emailValidator]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]],
        registro: ['', [Validators.required]],
        adm: [[false]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}

  cadastro() {
    if (this.cadastroProfessorForm.invalid) {
      this.snackBar.open(`Cadastro inválido, revise os campos.`, '', {
        duration: 5000,
      });
      return;
    }
    const request = new ProfessorModel({
      nome: this.cadastroProfessorForm.get('nome')?.value,
      email: this.cadastroProfessorForm.get('email')?.value,
      senha: this.cadastroProfessorForm.get('senha')?.value,
      registro: this.cadastroProfessorForm.get('registro')?.value,
      adm: false,
      status: false,
    });
    this.professorService.criarProfessor(request).subscribe({
      next: () => {
        this.snackBar.open(
          `Cadastro realizado, há a possibilidade do adm não permitir que a conta seja mantida.`,
          '',
          {
            duration: 5000,
          }
        );
        this.resetForms(this.cadastroProfessorForm);
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['home-adm']);
          });
        this.dialogRef.close('close');
      },
      error: () => {
        this.snackBar.open(`Ocorreu um erro durante sua solicitação.`, '', {
          duration: 3000,
        });
      },
    });
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
