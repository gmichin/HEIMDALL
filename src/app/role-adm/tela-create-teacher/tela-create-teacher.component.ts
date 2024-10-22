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
import { SessionService } from 'src/app/services/session.service';
import { TelaCreateAdmComponent } from '../tela-create-adm/tela-create-adm.component';
import { ProfessorModel } from 'src/app/models/professor.model';

@Component({
  selector: 'app-tela-create-teacher',
  templateUrl: './tela-create-teacher.component.html',
  styleUrls: ['./tela-create-teacher.component.scss'],
})
export class TelaCreateTeacherComponent implements OnInit {
  public cadastroProfessorAdmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cadastroService: CadastroService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<TelaCreateAdmComponent>
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
    const request = new ProfessorModel({
      professor_id: this.cadastroProfessorAdmForm.get('professor_id')?.value,
      nome: this.cadastroProfessorAdmForm.get('nome')?.value,
      email: this.cadastroProfessorAdmForm.get('email')?.value,
      senha: this.cadastroProfessorAdmForm.get('senha')?.value,
      registro: this.cadastroProfessorAdmForm.get('registro')?.value,
      adm: this.cadastroProfessorAdmForm.get('adm')?.value,
    });
    this.cadastroService.cadastro(request).subscribe({
      next: (res) => {
        this.snackBar.open(`Cadastrado com sucesso.`, '', {
          duration: 1500,
        });
        this.resetForms(this.cadastroProfessorAdmForm);
        this.dialogRef.close();
      },
      error: (err) => {
        this.snackBar.open(`Ocorreu um erro durante sua solicitação.`, '', {
          duration: 1000,
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
