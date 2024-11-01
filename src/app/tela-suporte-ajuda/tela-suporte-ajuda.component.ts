import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
@Component({
  selector: 'app-tela-suporte-ajuda',
  templateUrl: './tela-suporte-ajuda.component.html',
  styleUrl: './tela-suporte-ajuda.component.scss',
})
export class TelaSuporteAjudaComponent {
  constructor(public dialog: MatDialog) {
    sessionStorage.clear();
  }

  openLoginSignUp() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
