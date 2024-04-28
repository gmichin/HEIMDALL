import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';
import { RoleId } from '../models/role.model';
import { RegisterUserService } from '../services/register-user.service';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss'],
})

export class TelaPerfilComponent implements OnInit {
  public dataUser = <RegisterUserResponse>this.sessionService.getSessionData('user').retorno;

  public nome = this.dataUser.name;
  public role = '';
  public email = this.dataUser.email;

  public form: FormGroup;

  constructor(
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TelaPerfilComponent>,
    private register: RegisterUserService
  ) {
    switch(this.dataUser.role){
      case RoleId.ADM:
        this.role = 'Administrador';
        break;
      case RoleId.PROFESSOR:
        this.role = 'Professor';
        break;
      case RoleId.ALUNO:
        this.role = 'Aluno';
        break;
    }
    this.form = this.fb.group({
      email: [
        this.dataUser.email,
        [Validators.required, this.emailValidator],
      ],
      name: [this.dataUser.name, [Validators.required]],
      role: [this.dataUser.role, [Validators.required]],
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

    this.dataUser.email = this.form.get('email')?.value;
    this.dataUser.name = this.form.get('name')?.value;
    this.register.updateUser(this.dataUser).subscribe({
      next: ()=>{
        this.snackBar.open('Dados Atualizados com sucesso.', '', {
          duration: 1000,
        });
        this.dialogRef.close();
        
      },
      error: ()=>{
        this.snackBar.open('Ocorreu um erro durante sua solicitação.', '', {
          duration: 1000,
        });
        this.dialogRef.close();
      }
    })
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
