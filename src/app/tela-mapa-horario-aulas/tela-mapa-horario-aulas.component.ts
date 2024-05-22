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
  dateIni: Date;
  dateFim: Date;
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
  
  public days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  public hours = Array.from({ length: 19 }, (_, i) => `${i + 5}:00`);
  public timetable: { [key: string]: { [key: string]: string } } = {};
  public exceptions: ScheduleSlot[] = [];

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
      dateIni: new Date(reservation.start_time),
      dateFim: new Date(reservation.end_time),
      classId: reservation.class_id,
      roomId: reservation.room_id
    }));
    console.log(this.schedule);
  }

  populateTimetable() {
    const dayHourCount: { [key: string]: number } = {};
    this.schedule.forEach(slot => {
      const day = slot.dateIni.getDay();
      const hour = slot.dateIni.getHours();
      const key = `${day}-${hour}`;
      if (dayHourCount[key]) {
        dayHourCount[key]++;
      } else {
        dayHourCount[key] = 1;
      }
    });

    this.schedule.forEach(slot => {
      const day = slot.dateIni.getDay();
      const hour = slot.dateIni.getHours();
      const key = `${day}-${hour}`;
      if (dayHourCount[key] > 1) {
        this.addToTimetable(slot, day, hour);
      } else {
        this.exceptions.push(slot);
      }
    });
  }

  addToTimetable(slot: ScheduleSlot, day: number, hour: number) {
    const dayStr = this.days[day - 1];
    const hourStr = `${hour}:00`;
    if (!this.timetable[hourStr]) {
      this.timetable[hourStr] = {};
    }
    this.timetable[hourStr][dayStr] = `${slot.roomId} - ${slot.classId}`;
  }

  getClassAndRoom(hour: string, day: string): string {
    return this.timetable[hour]?.[day] || '';
  }
}
