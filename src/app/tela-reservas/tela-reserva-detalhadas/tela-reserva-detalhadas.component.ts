import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';

@Component({
  selector: 'app-tela-reserva-detalhadas',
  templateUrl: './tela-reserva-detalhadas.component.html',
  styleUrls: ['./tela-reserva-detalhadas.component.scss']
})
export class TelaReservaDetalhadasComponent {
  sala: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private salaDataService: SalaDataService) {
    const numeroSala = data.numero;
    this.sala = this.salaDataService.obterDetalhesSala(numeroSala);
  }
}
