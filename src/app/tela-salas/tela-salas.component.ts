import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-salas',
  templateUrl: './tela-salas.component.html',
  styleUrl: './tela-salas.component.scss',
})
export class TelaSalasComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<TelaSalasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addData() {
    this.dialogRef.close();
    this.router.navigate(['/tela-novas-salas']);
  }

  seeData() {
    this.dialogRef.close();
    this.router.navigate(['/tela-salas-feitas']);
  }
}
