import { Component, OnInit } from '@angular/core';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';
import { SalaDataService } from '../services/sala-data.service';
import { forkJoin } from 'rxjs';

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
  public tableHours = Array.from({ length: 17 }, (_, i) => i + 6); // 6 to 22
  public exceptions: ScheduleSlot[] = [];
  public classes: any[] = [];
  public rooms: any[] = [];
  public table: { [key: string]: { classId: string, roomId: string } } = {};

  constructor(
    private sessionService: SessionService,
    private salaDataService: SalaDataService
  ) { }

  ngOnInit() {
    forkJoin({
      reservations: this.salaDataService.carregarDadosSalasReservadas(),
      classes: this.salaDataService.carregarDadosClasses(),
      rooms: this.salaDataService.carregarDadosSalas()
    }).subscribe(({ reservations, classes, rooms }) => {
      this.reservations = reservations;
      this.classes = classes;
      this.rooms = rooms;
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
        scheduleCount[key] = 0; // Reset count to avoid reusing the slot
      } else {
        this.exceptions.push(reservation);
      }
    });
  }

  getReservation(day: string, hour: number): string {
    const reservation = this.schedule.find(slot => {
      const date = new Date(slot.dateIni);
      return date.getHours() === hour && this.daysOfWeek[date.getDay() - 1] === day;
    });
    if (reservation) {
      const className = this.classes.find(cls => cls._id === reservation.classId)?.name || 'N/A';
      const roomNumber = this.rooms.find(room => room._id === reservation.roomId)?.number || 'N/A';
      return `${className}\nNº da Sala: ${roomNumber}`;
    }
    return '';
  }
}
