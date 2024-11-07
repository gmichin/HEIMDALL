import { AlunoService } from 'src/app/services/aluno.service';
import { CadastroService } from '../../services/cadastros.service';
import { ProfessorModel } from '../../models/professor.model';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlunoModel } from 'src/app/models/aluno.model';

@Component({
  selector: 'app-tela-create-aluno',
  templateUrl: './tela-create-aluno.component.html',
  styleUrls: ['./tela-create-aluno.component.scss'],
})
export class TelaCreateAlunoComponent implements OnInit {
  public cadastroAlunosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private alunoService: AlunoService,
    private router: Router,
    public dialogRef: MatDialogRef<TelaCreateAlunoComponent>
  ) {
    this.cadastroAlunosForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, this.emailValidator]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]],
        registro: ['', [Validators.required]],
        ano_entrada: ['', [Validators.required]],
        status: [[false]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}
  cadastro() {
    if (this.cadastroAlunosForm.invalid) {
      this.snackBar.open(`Cadastro inválido, revise os campos.`, '', {
        duration: 5000,
      });
      return;
    }
    const request = new AlunoModel({
      nome: this.cadastroAlunosForm.get('nome')?.value,
      email: this.cadastroAlunosForm.get('email')?.value,
      senha: this.cadastroAlunosForm.get('senha')?.value,
      registro: this.cadastroAlunosForm.get('registro')?.value,
      ano_entrada: this.cadastroAlunosForm.get('ano_entrada')?.value,
      status: false,
    });
    this.alunoService.criarAluno(request).subscribe({
      next: () => {
        this.snackBar.open(
          `Cadastro realizado, há a possibilidade do adm não permitir que a conta seja mantida.`,
          '',
          {
            duration: 5000,
          }
        );
        this.resetForms(this.cadastroAlunosForm);
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
    const password = control.get('senha');
    const confirmPassword = control.get('confirmarSenha');

    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
