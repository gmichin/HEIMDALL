import {Component} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login-cadastro.component.html',
  styleUrls: ['./tela-login-cadastro.component.scss'],
})
export class TelaLoginCadastroComponent {
  title = 'demoApp';
  email!: string;
  password!: string;
  remail!: string;
  rpassword!: string;
  rcpassword!: string;
 
   constructor(private snackBar:MatSnackBar){
 
   }
   register() {
 
   }
   login() {
     if(this.email=="Gustavo" && this.password=="Gu1234"){
         this.snackBar.open('Login Successful','',{duration:1000})
     }else{
       this.snackBar.open('Login error','',{duration:1000})
     }
   }
}