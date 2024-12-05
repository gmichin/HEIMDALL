import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';
import { TelaConfirmacaoEmailComponent } from '../tela-confirmacao-email/tela-confirmacao-email.component';
@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss'],
})
export class TelaInicialComponent {
  constructor(public dialog: MatDialog, private router: Router) {
    sessionStorage.clear();
  }

  openLoginSignUp() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if(result === 'cadastro') {
        const dialogRef2 = this.dialog.open(TelaConfirmacaoEmailComponent);
        dialogRef2.afterClosed().subscribe();
      }
      console.log(`Dialog result: ${result}`);
    });
  }
  openSuporteAjuda() {
    this.router.navigate(['tela-suporte-ajuda']);
  }
}
