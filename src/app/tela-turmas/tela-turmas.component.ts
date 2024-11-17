import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-turmas',
  templateUrl: './tela-turmas.component.html',
  styleUrl: './tela-turmas.component.scss',
})
export class TelaTurmasComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<TelaTurmasComponent>,
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
    this.router.navigate(['/tela-novas-turmas']);
  }

  seeData() {
    this.dialogRef.close();
    this.router.navigate(['/tela-turmas-feitas']);
  }

  redirectMinhasTurmas() {
    this.dialogRef.close();
    this.router.navigate(['minhas-turmas']);
  }
}
