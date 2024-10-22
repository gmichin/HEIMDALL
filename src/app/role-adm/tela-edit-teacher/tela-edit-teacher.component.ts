import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfessorModel } from 'src/app/models/professor.model';
import { CadastroService } from 'src/app/services/cadastros.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-tela-edit-teacher',
  templateUrl: './tela-edit-teacher.component.html',
  styleUrls: ['./tela-edit-teacher.component.scss'],
})
export class TelaEditTeacherComponent implements OnInit {
  public cadastroProfessorAdmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cadastroService: CadastroService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<TelaEditTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfessorModel
  ) {
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
  }

  ngOnInit() {}

  register() {
    if (this.cadastroProfessorAdmForm.invalid) {
      return;
    }
    (this.data.nome = this.cadastroProfessorAdmForm.get('nome')?.value),
      (this.data.email = this.cadastroProfessorAdmForm.get('email')?.value),
      (this.data.senha = this.cadastroProfessorAdmForm.get('senha')?.value),
      (this.data.registro =
        this.cadastroProfessorAdmForm.get('registro')?.value),
      (this.data.adm = this.cadastroProfessorAdmForm.get('adm')?.value),
      this.cadastroService.atualizarUsuário(this.data).subscribe({
        next: () => {
          this.snackBar.open('Dados atualizados com sucesso.', '', {
            duration: 1500,
          });
          this.dialogRef.close();
        },
        error: (err) => {
          this.snackBar.open('Ocorreu um erro durante sua solicitação.', '', {
            duration: 1500,
          });
          this.dialogRef.close();
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
