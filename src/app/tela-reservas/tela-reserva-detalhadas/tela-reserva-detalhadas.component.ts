import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tela-reserva-detalhadas',
  templateUrl: './tela-reserva-detalhadas.component.html',
  styleUrls: ['./tela-reserva-detalhadas.component.scss']
})
export class TelaReservaDetalhadasComponent {
  sala: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.sala = data;
  }
}
