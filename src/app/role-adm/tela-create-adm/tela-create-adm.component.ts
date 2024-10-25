import { CadastroService } from './../../services/cadastros.service';
import { ProfessorModel } from './../../models/professor.model';
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

@Component({
  selector: 'app-tela-create-adm',
  templateUrl: './tela-create-adm.component.html',
  styleUrls: ['./tela-create-adm.component.scss'],
})
export class TelaCreateAdmComponent implements OnInit {
  public cadastroProfessorAdmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cadastroService: CadastroService,
    private router: Router,
    public dialogRef: MatDialogRef<TelaCreateAdmComponent>
  ) {
    this.cadastroProfessorAdmForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, this.emailValidator]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]],
        registro: ['', [Validators.required]],
        adm: [true],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}
  cadastro() {
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
      adm: true,
    });
    this.cadastroService.cadastroProfessorAdm(request).subscribe({
      next: () => {
        this.snackBar.open(
          `Cadastro realizado, há a possibilidade do adm não permitir que a conta seja mantida.`,
          '',
          {
            duration: 5000,
          }
        );
        this.resetForms(this.cadastroProfessorAdmForm);
        this.router.navigate(['home-adm']);
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
