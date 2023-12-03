import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { NewTelaReservaComponent } from 'src/app/tela-reservas/new-tela-reserva/new-tela-reserva.component';
import { TelaMarcarReservaComponent } from 'src/app/tela-reservas/tela-marcar-reserva/tela-marcar-reserva.component';

@Component({
  selector: 'app-tela-reserva-detalhadas',
  templateUrl: './tela-reserva-detalhadas.component.html',
  styleUrls: ['./tela-reserva-detalhadas.component.scss'],
})
export class TelaReservaDetalhadasComponent {
  sala: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salaDataService: SalaDataService,
    private dialog: MatDialog,
    private dialogDetails: MatDialogRef<TelaReservaDetalhadasComponent>
  ) {
    const numeroSala = data.numero;
    this.sala = this.salaDataService.obterDetalhesSala(numeroSala);
  }

  editarSala() {
    const dialogRef = this.dialog.open(NewTelaReservaComponent, {
      width: '400px',
      maxHeight: '480px',
      data: this.sala,
    });
    this.dialogDetails.close();
  }

  deletarSala() {
    const numeroSala = this.sala.numero;
    this.salaDataService.deletarSala(numeroSala);
    this.dialogDetails.close();
  }

  reservarSala() {
    const dialogT = this.dialog.open(TelaMarcarReservaComponent, {
      width: '400px',
      data: this.sala,
    });
    this.dialogDetails.close();
  }
}
