import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss'],
})

export class TelaPerfilComponent implements OnInit {
  public dados = <
    {
      dataUser: RegisterUserResponse;
      roleDesc: string;
    }
  >this.sessionService.getSessionData('profile').retorno;

  public nome = this.dados.dataUser.name;
  public role = this.dados.roleDesc;
  public email = this.dados.dataUser.email;

  public form: FormGroup;

  constructor(
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TelaPerfilComponent>
  ) {
    this.form = this.fb.group({
      email: [
        this.dados.dataUser.email,
        [Validators.required, this.emailValidator],
      ],
      name: [this.dados.dataUser.name, [Validators.required]],
    });
  }

  ngOnInit() {}

  public save() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, revise os campos.', '', {
        duration: 1000,
      });
      return;
    }
    const user =
      this.sessionService.getSessionData<RegisterUserResponse>('userData');

    user.retorno.email = this.form.get('email')?.value;
    user.retorno.name = this.form.get('name')?.value;
    this.sessionService.setItem('userData', user.retorno);

    this.dados.dataUser.email = this.form.get('email')?.value;
    this.dados.dataUser.name = this.form.get('name')?.value;
    this.sessionService.setItem('profile', this.dados);
    this.snackBar.open('Dados Atualizados com sucesso.', '', {
      duration: 1000,
    });
    this.dialogRef.close();
  }

  private emailValidator(control: any) {
    const value = control.value;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (value && !pattern.test(value)) {
      return { email: true };
    }
    return null;
  }
}
