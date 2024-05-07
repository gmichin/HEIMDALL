import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-salas',
  templateUrl: './tela-salas.component.html',
  styleUrl: './tela-salas.component.scss'
})
export class TelaSalasComponent {
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
    this.router.navigate(['/tela-novas-salas']);
  }

  removeData() {
    this.router.navigate(['/tela-deletar-salas']);
  }

  permissionData() {
    this.router.navigate(['/tela-permissao-salas']);
  }

  seeData() {
    this.router.navigate(['/tela-salas-feitas']);
  }
}
