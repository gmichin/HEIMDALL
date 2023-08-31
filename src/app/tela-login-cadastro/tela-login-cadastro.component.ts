import {Component} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
 
  constructor(private snackBar:MatSnackBar){}

  register() {
    if(this.rpassword != this.rcpassword){
      this.snackBar.open('As senhas estão diferentes','',{duration:1000})
    }
  }
  login() {
    if(this.email=="Gustavo" && this.password=="Gu1234"){
      this.snackBar.open('Login feito com sucesso!','',{duration:1000})
    } else {
      this.snackBar.open('Erro de login','',{duration:1000})
    }
  }
}