import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  RegisterInstitutionResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from 'src/app/models/register.models';
import { RegisterUserService } from 'src/app/services/register-user.service';
import { SessionService } from 'src/app/services/session.service';
import { TelaCreateAdmComponent } from '../tela-create-adm/tela-create-adm.component';
import { RoleId } from 'src/app/models/role.model';

@Component({
  selector: 'app-tela-create-teacher',
  templateUrl: './tela-create-teacher.component.html',
  styleUrls: ['./tela-create-teacher.component.scss'],
})
export class TelaCreateTeacherComponent implements OnInit {
  public resgiterForm: FormGroup;
  private idInstitution =
    this.sessionService.getSessionData<string>(
      'idInstitution'
    ).retorno;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private registerUserService: RegisterUserService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<TelaCreateAdmComponent>
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
  }

  ngOnInit() {}

  register() {
    if (this.resgiterForm.invalid) {
      return;
    }
    const request = new RegisterUserRequest({
      name: this.resgiterForm.get('nome')?.value,
      email: this.resgiterForm.get('email')?.value,
      encrypted_password: this.resgiterForm.get('password')?.value,
      role: {_id: RoleId.ADM},
    });
    this.registerUserService.register(request, this.idInstitution).subscribe({
      next: (res) => {
        this.snackBar.open(`Cadastrado com sucesso.`, '', {
          duration: 1500,
        });
        this.resetForms(this.resgiterForm);
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
