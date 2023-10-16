import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login-cadastro.component.html',
  styleUrls: ['./tela-login-cadastro.component.scss'],
})
export class TelaLoginCadastroComponent {
  email!: string;
  password!: string;
  remail!: string;
  rpassword!: string;
  rcpassword!: string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<TelaLoginCadastroComponent>
  ) {}

  register() {
    if (this.rpassword != this.rcpassword) {
      this.snackBar.open('As senhas estão diferentes', '', { duration: 1000 });
    }
  }
  login() {
    if (this.email == 'ericolima@outlook.com' && this.password == 'erico') {
      this.snackBar.open('Login feito com sucesso!', '', { duration: 1000 });
      setTimeout(() => {
        this.dialogRef.close('close');
        this.router.navigate(['edicao']);
      }, 1500);
    } else {
      this.snackBar.open('Erro de login', '', { duration: 1000 });
    }
  }
}
