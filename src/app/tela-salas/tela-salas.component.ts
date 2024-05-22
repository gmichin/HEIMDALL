import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';
import { ReloadService } from '../services/reload.service';

@Component({
  selector: 'app-tela-salas',
  templateUrl: './tela-salas.component.html',
  styleUrl: './tela-salas.component.scss'
})
export class TelaSalasComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private reloadService: ReloadService,
    public dialogRef: MatDialogRef<TelaSalasComponent>
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
    this.reloadService.reoladPage(['/tela-novas-salas']);
  }
  
  seeData() {
    this.dialogRef.close();
    this.reloadService.reoladPage(['/tela-salas-feitas']);
  }
}
