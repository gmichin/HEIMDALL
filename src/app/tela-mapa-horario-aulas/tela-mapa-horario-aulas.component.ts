import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';
import { SalaDataService } from '../services/sala-data.service';
import { CalendarEvent, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, endOfDay, format } from 'date-fns';
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
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent[] = [];

  constructor(
    private sessionService: SessionService,
    private salaDataService: SalaDataService,
    private datePipe: DatePipe
  ){
    this.dataUser = this.sessionService.getSessionData('user').retorno as RegisterUserResponse;
    this.salaDataService.salaReservaData$.subscribe(reservas => {
      this.reservas = reservas;
      this.filterUserReservas();
      this.loadEvents();
    });
  }

  filterUserReservas() {
    this.userReservas = this.reservas.filter(reserva => reserva.user_id === this.dataUser._id);
  }

  loadEvents() {
    this.events = this.userReservas.map(reserva => {
      return {
        start: new Date(reserva.start_time),
        end: new Date(reserva.end_time),
        title: `Class ID: ${reserva.class_id}`,
        meta: {
          reserva: reserva
        }
      };
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
    alert(`Class ID: ${(event.meta as any).reserva.class_id}\nStart Time: ${event.start}\nEnd Time: ${event.end}`);
  }
}
