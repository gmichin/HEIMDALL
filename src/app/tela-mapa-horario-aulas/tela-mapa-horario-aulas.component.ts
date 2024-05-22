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
  dayOfWeek: string;
  hour: number;
}

@Component({
  selector: 'app-tela-mapa-horario-aulas',
  templateUrl: './tela-mapa-horario-aulas.component.html',
  styleUrls: ['./tela-mapa-horario-aulas.component.scss']
})
export class TelaMapaHorarioAulasComponent implements OnInit {
  public dataUser = <RegisterUserResponse>this.sessionService.getSessionData('user').retorno;
  public id = this.dataUser._id;
  public reservations: Reservation[] = [];
  public userReservations: Reservation[] = [];
  public schedule: ScheduleSlot[] = [];
  public daysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
  public tableHours = Array.from({ length: 19 }, (_, i) => i + 5); // 5 to 23
  public exceptions: ScheduleSlot[] = [];
  public table: { [key: string]: { classId: string, roomId: string } } = {};

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

  getDayOfWeek(date: Date): string {
    const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    return days[date.getUTCDay()];
  }

  getHour(date: Date): number {
    return date.getUTCHours();
  }

  processReservations() {
    const scheduleCount: { [key: string]: number } = {};

    this.schedule = this.userReservations.flatMap(reservation => {
      const startDate = new Date(reservation.start_time);
      const endDate = new Date(reservation.end_time);
      const startHour = this.getHour(startDate);
      const endHour = this.getHour(endDate);
      const dayOfWeek = this.getDayOfWeek(startDate);
      const slots: ScheduleSlot[] = [];

      for (let hour = startHour; hour <= endHour; hour++) {
        const key = `${dayOfWeek}-${hour}`;

        if (!scheduleCount[key]) {
          scheduleCount[key] = 0;
        }
        scheduleCount[key]++;

        slots.push({
          dateIni: startDate,
          dateFim: endDate,
          classId: reservation.class_id,
          roomId: reservation.room_id,
          dayOfWeek,
          hour
        });
      }

      return slots;
    });

    this.fillTable(scheduleCount);
    console.log(this.schedule);
  }

  fillTable(scheduleCount: { [key: string]: number }) {
    const maxOccurrences = Math.max(...Object.values(scheduleCount));

    this.schedule.forEach(reservation => {
      const key = `${reservation.dayOfWeek}-${reservation.hour}`;

      if (scheduleCount[key] === maxOccurrences) {
        this.table[key] = {
          classId: reservation.classId,
          roomId: reservation.roomId
        };
        scheduleCount[key] = 0; 
      } else {
        this.exceptions.push(reservation);
      }
    });
  }

  getReservation(day: string, hour: number) {
    const key = `${day}-${hour}`;
    const reservation = this.table[key];
    return reservation ? `Sala ${reservation.roomId}\nAula ${reservation.classId}` : '';
  }
}
