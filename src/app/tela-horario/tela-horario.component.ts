import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-horario',
  templateUrl: './tela-horario.component.html',
  styleUrls: ['./tela-horario.component.scss'],
})
export class TelaHorarioComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router
    ) {}

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
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
