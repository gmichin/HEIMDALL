import { Component, OnInit } from '@angular/core';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';
import { SalaDataService } from '../services/sala-data.service';
import { forkJoin } from 'rxjs';
import { eachHourOfInterval } from 'date-fns';

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
export class TelaMapaHorarioAulasComponent implements OnInit {
  public dataUser = <RegisterUserResponse>this.sessionService.getSessionData('user').retorno;
  public id = this.dataUser._id;
  public reservations: Reservation[] = [];
  public userReservations: Reservation[] = [];
  public schedule: ScheduleSlot[] = [];
  public classes: any[] = [];
  public rooms: any[] = [];
  public exceptions: any[] = [];

  public tableHours: number[] = Array.from({ length: 17 }, (_, i) => i + 6); // Horas das 6 às 22
  public daysOfWeek: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  constructor(
    private sessionService: SessionService,
    private salaDataService: SalaDataService
  ) {}

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

  processReservations() {
    this.schedule = this.userReservations.flatMap(reservation => {
      const start = this.parseDate(reservation.start_time);
      const end = this.parseDate(reservation.end_time);

      console.log(`Start Time (original): ${reservation.start_time}`);
      console.log(`End Time (original): ${reservation.end_time}`);
      console.log(`Start Time (Date object): ${start}`);
      console.log(`End Time (Date object): ${end}`);

      const slots = eachHourOfInterval({ start, end: new Date(end.getTime() - 1) }).map(date => ({
        date,
        classId: reservation.class_id,
        roomId: reservation.room_id
      }));

      // Adicionar a última hora
      slots.push({
        date: end,
        classId: reservation.class_id,
        roomId: reservation.room_id
      });

      return slots;
    });
    console.log('Processed schedule:', this.schedule);
  }

  parseDate(dateStr: string): Date {
    // Remover prefixo indesejado (ex: "027 ") e criar objeto Date
    const cleanedDateStr = dateStr.replace(/^\d{3}\s/, '');
    return new Date(cleanedDateStr);
  }

  getReservation(day: string, hour: number): string {
    const reservation = this.schedule.find(slot => {
      const date = slot.date;
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
