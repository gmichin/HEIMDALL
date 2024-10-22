import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-disciplinas',
  templateUrl: './tela-disciplinas.component.html',
  styleUrl: './tela-disciplinas.component.scss',
})
export class TelaDisciplinasComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<TelaDisciplinasComponent>,
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
    this.router.navigate(['/tela-novas-materias']);
  }

  seeData() {
    this.dialogRef.close();
    this.router.navigate(['/tela-materias-feitas']);
  }
}
