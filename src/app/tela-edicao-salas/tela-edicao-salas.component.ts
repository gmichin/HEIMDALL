import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Rooms } from '../models/rooms.model';
import { GetRoomsService } from '../services/get-rooms.service';
import { NovaSalaModalComponent } from './nova-sala-modal/nova-sala-modal.component';
import { SalaModalComponent } from './sala-modal/sala-modal.component';

@Component({
  selector: 'app-tela-edicao-salas',
  templateUrl: './tela-edicao-salas.component.html',
  styleUrls: ['./tela-edicao-salas.component.Scss'],
})
export class TelaEdicaoSalasComponent implements OnInit {
  public filterName = '';
  public teacher = '';
  public schedule = '';
  public minSeats: number | null = null;
  public maxSeats: number | null = null;
  public filteredRooms: Rooms[] = this.roomsService.rooms;
  public teachers: { value: string; name: string }[] = [];
  public schedules: { value: string; name: string }[] = [];

  disableSelect = new FormControl(false);

  constructor(
    public dialog: MatDialog,
    private roomsService: GetRoomsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.teachers = this.roomsService.teachers;
    this.schedules = this.roomsService.schedules;
  }

  public applyFilters() {
    this.filterRooms();
  }

  public clearFilters(selectHtml: MatSelect[]) {
    this.filteredRooms = this.roomsService.rooms;
    this.filterName = '';
    this.teacher = '';
    this.schedule = '';
    this.minSeats = null;
    this.maxSeats = null;
    selectHtml.forEach((select) => (select.value = null));
  }

  public returnToHome() {
    this.router.navigate(['']);
  }

  private filterRooms() {
    this.filteredRooms = this.roomsService.rooms.filter((room) => {
      return (
        this.validateSchedules(room.schedule) &&
        this.validateNames(room.name) &&
        this.validateSeats(room.seats) &&
        this.validateTeachers(room.teacher)
      );
    });
    if (this.filteredRooms.length == 0) {
      this.snackBar.open('Sem resultados para esses filtros', '', {
        duration: 2000,
      });
    }
  }

  private validateSchedules(schedule: string) {
    return this.schedule.trim() == '' ? true : this.schedule == schedule;
  }

  private validateTeachers(teacher: string) {
    return this.teacher.trim() == '' ? true : this.teacher == teacher;
  }

  private validateNames(name: string) {
    return this.filterName.trim() == ''
      ? true
      : name.toLowerCase().includes(this.filterName.toLowerCase());
  }

  private validateSeats(seats: number) {
    const min = Number(this.minSeats) ?? 0;
    const convertMax = Number(this.maxSeats);
    const max = convertMax == 0 ? 1000000000000000 : convertMax;

    return seats <= max && seats >= min;
  }

  public openModalNewRoom() {
    const dialogRef = this.dialog.open(NovaSalaModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((editedRoom) => {
      if (editedRoom) {
        this.applyFilters();
      }
    });
  }

  public openModal(data: Rooms): void {
    const dialogRef = this.dialog.open(SalaModalComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((editedRoom) => {
      if (editedRoom) {
        this.applyFilters();
      }
    });
  }

  public atualiza(value: string, type: string) {
    if (type == 'horario') {
      this.schedule = value;
      return;
    }
    this.teacher = value;
  }
}
