import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { SalaDataService } from 'src/app/services/sala-data.service';

@Component({
  selector: 'app-tela-reservas-feitas',
  templateUrl: './tela-reservas-feitas.component.html',
  styleUrls: ['./tela-reservas-feitas.component.scss']
})
export class TelaReservasFeitasComponent {
  salas: Sala[] = [];
  displayedColumns: string[] = ['numero', 'professor', 'materia', 'dia'];

  constructor(
    private salaDataService: SalaDataService,
    public dialog: MatDialog
  ) {
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.salas = salas;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

interface Sala {
  numero: number;
  professor: string;
  materia: string;
  dia: Date;
}
