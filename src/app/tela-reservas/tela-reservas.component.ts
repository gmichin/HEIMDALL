import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-reservas',
  templateUrl: './tela-reservas.component.html',
  styleUrl: './tela-reservas.component.scss'
})
export class TelaReservasComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  addData() {
    this.router.navigate(['/tela-novas-reservas']);
  }

  removeData() {
    this.router.navigate(['/tela-novas-reservas']);
  }
}
