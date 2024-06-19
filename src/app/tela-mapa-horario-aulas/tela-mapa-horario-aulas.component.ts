import { Component, OnInit } from '@angular/core';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';
import { SalaDataService } from '../services/sala-data.service';
import { forkJoin } from 'rxjs';
import { eachHourOfInterval, parseISO, addHours } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaReservasComponent } from '../tela-reservas/tela-reservas.component';
import { ReloadService } from '../services/reload.service';
import { RoleId } from '../models/role.model';

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
  public role = '';

  public tableHours: string[] = Array.from({ length: 17 }, (_, i) => (i + 6 < 10 ? '0' : '') + (i + 6).toString());
  public daysOfWeek: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  constructor(
    private sessionService: SessionService,
    private salaDataService: SalaDataService,
    private router: Router,
    private reload: ReloadService,
    public dialog: MatDialog,
  ) {
    
    switch(this.dataUser.role){
      case RoleId.ADM:
        this.role = 'Administrador';
        break;
      case RoleId.PROFESSOR:
        this.role = 'Professor';
        break;
      case RoleId.ALUNO:
        this.role = 'Aluno';
        break;
    }
  }

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

  goBack(){
    if(this.role=="Administrador") this.router.navigate(['/home-adm']);
    else if(this.role=="Professor") this.router.navigate(['/home-teacher']);
    else if(this.role=="Aluno") this.router.navigate(['/home-student']);
  }
  logout(){
    this.router.navigate(['/']);
  }
  filterUserReservations() {
    this.userReservations = this.reservations.filter(reservation => reservation.user_id === this.id);
    this.processReservations();
  }

  public redirectHomeAdm() {
    this.reload.reoladPage(['redirecionar'])
  }

  processReservations() {
    this.schedule = this.userReservations.flatMap(reservation => {
      const startParts = reservation.start_time.split(' ');
      const endParts = reservation.end_time.split(' ');

      const startYear = parseInt(startParts[3]);
      const startMonth = this.getMonthIndex(startParts[1]);
      const startDay = parseInt(startParts[2]);
      const startHour = parseInt(startParts[4].split(':')[0]);
      const startMinute = parseInt(startParts[4].split(':')[1]);
      const endYear = parseInt(endParts[3]);
      const endMonth = this.getMonthIndex(endParts[1]);
      const endDay = parseInt(endParts[2]);
      const endHour = parseInt(endParts[4].split(':')[0]);
      const endMinute = parseInt(endParts[4].split(':')[1]);

      const startDate = new Date(startYear, startMonth, startDay, startHour, startMinute);
      let endDate = new Date(endYear, endMonth, endDay, endHour, endMinute);

      const daysDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      let slots = [];

      if (daysDifference > 0) {
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const currentEnd = currentDate.getDate() === endDate.getDate() ? endDate : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

          if (currentDate.getDate() === startDay && currentDate.getDate() === endDay) {
            slots.push(...eachHourOfInterval({ start: currentDate, end: addHours(currentDate, 19 - currentDate.getHours()) }).map(date => ({
              date,
              classId: reservation.class_id,
              roomId: reservation.room_id
            })));
          } else if (currentDate.getDate() === startDay) {
            slots.push(...eachHourOfInterval({ start: currentDate, end: addHours(currentDate, 19 - currentDate.getHours()) }).map(date => ({
              date,
              classId: reservation.class_id,
              roomId: reservation.room_id
            })));
          } else if (currentDate.getDate() === endDay) {
            slots.push(...eachHourOfInterval({ start: currentDate, end: addHours(currentEnd, -1) }).map(date => ({
              date,
              classId: reservation.class_id,
              roomId: reservation.room_id
            })));

            const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0);
            if (currentDate <= endOfDay) {
              slots.push({
                date: endOfDay,
                classId: reservation.class_id,
                roomId: reservation.room_id
              });
            }
          } else {
            slots.push(...eachHourOfInterval({ start: currentDate, end: addHours(currentEnd, -1) }).map(date => ({
              date,
              classId: reservation.class_id,
              roomId: reservation.room_id
            })));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else {
        slots = eachHourOfInterval({ start: startDate, end: addHours(endDate, -1) }).map(date => ({
          date,
          classId: reservation.class_id,
          roomId: reservation.room_id
        }));

        const endOfDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 19, 0, 0);
        if (startDate <= endOfDay && endDate >= endOfDay) {
          slots.push({
            date: endOfDay,
            classId: reservation.class_id,
            roomId: reservation.room_id
          });
        }
      }
      return slots;
    });
  }

  getMonthIndex(month: string): number {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames.indexOf(month);
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

  hasReservation(day: string, hour: number): boolean {
    return this.schedule.some(slot => {
      const date = slot.date;
      return date.getHours() === hour && this.daysOfWeek[date.getDay() - 1] === day;
    });
  }

  public redirectReserve() {
    const dialogT = this.dialog.open(TelaReservasComponent, {
      width: '400px',
    });
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }

  private dialogCloseSubs() {
    this.router.navigate(['reload']);
  }
}
