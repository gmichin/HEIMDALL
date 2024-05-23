import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';
import { ReloadService } from '../services/reload.service';

@Component({
  selector: 'app-tela-reservas',
  templateUrl: './tela-reservas.component.html',
  styleUrl: './tela-reservas.component.scss'
})
export class TelaReservasComponent {
  constructor(
    public dialog: MatDialog,
    private reloadService: ReloadService,
    public dialogRef: MatDialogRef<TelaReservasComponent>,
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
    this.reloadService.reoladPage(['/tela-novas-reservas']);
  }

  removeData() {
    this.dialogRef.close();
    this.reloadService.reoladPage(['/tela-deletar-reservas']);
  }

  permissionData() {
    this.dialogRef.close();
    this.reloadService.reoladPage(['/tela-permissao-reservas']);
  }

  seeData() {
    this.dialogRef.close();
    this.reloadService.reoladPage(['/tela-reservas-feitas']);
  }
}
