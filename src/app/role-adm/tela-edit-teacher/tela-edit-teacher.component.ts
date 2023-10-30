import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  RegisterInstitutionResponse,
  RegisterUserResponse,
} from 'src/app/models/register.models';
import { RegisterUserService } from 'src/app/services/register-user.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-tela-edit-teacher',
  templateUrl: './tela-edit-teacher.component.html',
  styleUrls: ['./tela-edit-teacher.component.scss'],
})
export class TelaEditTeacherComponent implements OnInit {
  public resgiterForm: FormGroup;
  private institution =
    this.sessionService.getSessionData<RegisterInstitutionResponse>(
      'dadosInstituto'
    ).retorno;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private registerUserService: RegisterUserService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<TelaEditTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterUserResponse
  ) {
    this.resgiterForm = this.fb.group({
      nome: [data.name, [Validators.required]],
      email: [data.email, [Validators.required, this.emailValidator]],
    });
  }

  ngOnInit() {}

  register() {
    if (this.resgiterForm.invalid) {
      return;
    }
    const teachers =
      this.sessionService.getSessionData<RegisterUserResponse[]>(
        'teachers'
      ).retorno;
    teachers.forEach((a) => {
      if (a._id == this.data._id) {
        a.name = this.resgiterForm.get('nome')?.value;
        a.email = this.resgiterForm.get('email')?.value;
      }
    });

    this.sessionService.setItem('teachers', teachers);

    this.snackBar.open('Dados atualizados com sucesso.', '', {
      duration: 1000,
    });
    this.dialogRef.close();
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
