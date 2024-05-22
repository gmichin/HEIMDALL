import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';
import { ReloadService } from '../services/reload.service';

@Component({
  selector: 'app-tela-materias',
  templateUrl: './tela-materias.component.html',
  styleUrl: './tela-materias.component.scss'
})
export class TelaMateriasComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private reloadService: ReloadService,
    public dialogRef: MatDialogRef<TelaMateriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  addData() {
    this.dialogRef.close();
    this.reloadService.reoladPage(['/tela-novas-materias']);
  }
  
  seeData() {
    this.dialogRef.close();
    this.reloadService.reoladPage(['/tela-materias-feitas']);
  }
}
