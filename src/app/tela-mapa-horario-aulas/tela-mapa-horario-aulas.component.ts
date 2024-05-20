import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';
import { SalaDataService } from '../services/sala-data.service';

interface Reserva {
  _id: string;
  room_id: string;
  user_id: string;
  class_id: string;
  start_time: string;
  end_time: string;
  __v: number;
}
@Component({
  selector: 'app-tela-mapa-horario-aulas',
  templateUrl: './tela-mapa-horario-aulas.component.html',
  styleUrl: './tela-mapa-horario-aulas.component.scss'
})
export class TelaMapaHorarioAulasComponent {
  public dataUser = <RegisterUserResponse>this.sessionService.getSessionData('user').retorno;
  public id = this.dataUser._id;
  public reservas: Reserva[] = [];
  public userReservas: Reserva[] = [];

  constructor(
    private sessionService: SessionService,
    private salaDataService: SalaDataService,
    private datePipe: DatePipe
  ){
    this.dataUser = this.sessionService.getSessionData('user').retorno as RegisterUserResponse;
    this.salaDataService.salaReservaData$.subscribe(reservas => {
      this.reservas = reservas;
      this.filterUserReservas();
    });
  }

  filterUserReservas() {
    this.userReservas = this.reservas.filter(reserva => reserva.user_id === this.dataUser._id);
    console.log(this.userReservas);
  }

  formatDate(date: string): string {
    return this.datePipe.transform(new Date(date), 'dd MMM yyyy HH:mm') || date;
  }
}
