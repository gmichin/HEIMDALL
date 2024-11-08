import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-reservas',
  templateUrl: './tela-reservas.component.html',
  styleUrl: './tela-reservas.component.scss',
})
export class TelaReservasComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TelaReservasComponent>
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addData() {
    this.dialogRef.close();
    this.router.navigate(['/tela-novas-reservas']);
  }

  permissionData() {
    this.dialogRef.close();
    this.router.navigate(['/tela-permissao-reservas']);
  }

  seeData() {
    this.dialogRef.close();
    this.router.navigate(['/tela-reservas-feitas']);
  }
}
