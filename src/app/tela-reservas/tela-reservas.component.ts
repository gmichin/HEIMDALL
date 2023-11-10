import { Component } from '@angular/core';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import {Router } from '@angular/router';
@Component({
  selector: 'app-tela-reservas',
  templateUrl: './tela-reservas.component.html',
  styleUrls: ['./tela-reservas.component.scss']
})
export class TelaReservasComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {}

    public redirectProfile() {
      const dialogT = this.dialog.open(TelaPerfilComponent, {
        width: '400px',
      });
      dialogT.afterClosed().subscribe(() => {
        this.dialogCloseSubs();
      });
    }
  
    public redirectReserve() {
      const dialogT = this.dialog.open(TelaReservasComponent, {
        width: '400px',
      });
      dialogT.afterClosed().subscribe(() => {
        this.dialogCloseSubs();
      });
    }

    private dialogCloseSubs() {
      this.router.navigate(['reload']);
    }
}
