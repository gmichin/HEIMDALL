import { Component, OnInit } from '@angular/core';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';
import { SalaDataService } from '../services/sala-data.service';

class Reservation {
  _id: string = '';
  room_id: string = '';
  user_id: string = '';
  class_id: string = '';
  start_time: string = '';
  end_time: string = '';
  __v: number = 0;
}

interface ScheduleSlot {
  date: Date;
  classId: string;
  roomId: string;
}

@Component({
  selector: 'app-tela-mapa-horario-aulas',
  templateUrl: './tela-mapa-horario-aulas.component.html',
  styleUrls: ['./tela-mapa-horario-aulas.component.scss']
})
export class TelaMapaHorarioAulasComponent implements OnInit{
  public dataUser = <RegisterUserResponse>this.sessionService.getSessionData('user').retorno;

  public id = this.dataUser._id;

  public reservations: Reservation[] = [];
  public userReservations: Reservation[] = [];

  public schedule: ScheduleSlot[] = [];
  public selectedDate: Date | undefined;

  constructor(
    private sessionService: SessionService,
    private salaDataService: SalaDataService
  ) { }

  ngOnInit() {
    this.salaDataService.carregarDadosSalasReservadas().subscribe(data => {
      this.reservations = data;
      this.filterUserReservations();
    });
  }

  filterUserReservations() {
    this.userReservations = this.reservations.filter(reservation => reservation.user_id === this.id);
    this.processReservations();
  }

  processReservations() {
    this.schedule = this.userReservations.map(reservation => ({
      date: new Date(reservation.start_time), // Convertendo para objeto Date
      classId: reservation.class_id,
      roomId: reservation.room_id
    }));
    console.log(this.schedule);
  }

  dateSelected(date: Date) {
    this.selectedDate = date;
  }
}
