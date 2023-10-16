import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { GetRoomsService } from '../services/get-rooms.service';
import { NovaSalaModalComponent } from './nova-sala-modal/nova-sala-modal.component';
import { SalaModalComponent } from './sala-modal/sala-modal.component';

@Component({
  selector: 'app-tela-edicao-salas',
  templateUrl: './tela-edicao-salas.component.html',
  styleUrls: ['./tela-edicao-salas.component.Scss'],
})
export class TelaEdicaoSalasComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private roomsService: GetRoomsService
  ) {}

  filterName = '';
  teacher = '';
  teachers: any[] = [];
  showRooms = true;
  minSeats: number | null = null;
  maxSeats: number | null = null;
  filteredRooms = <
    { name: string; seats: number; description: string; teacher: string }[]
  >[];

  disableSelect = new FormControl(false);

  private filterRooms() {
    this.filteredRooms = this.roomsService.rooms.filter((room) => {
      return (
        this.validateNames(room.name) &&
        this.validateSeats(room.seats) &&
        this.validateTeachers(room.teacher)
      );
    });
  }

  private validateTeachers(name: string) {
    return this.teacher.trim() == '' ? true : this.teacher == name;
  }

  private validateNames(name: string) {
    const d =
      this.filterName.trim() == ''
        ? true
        : name.toLowerCase().includes(this.filterName.toLowerCase());
    return d;
  }

  private validateSeats(seats: number) {
    const min = this.minSeats ?? 0;
    if (this.maxSeats) {
      const d = seats <= this.maxSeats && seats >= min;
      return d;
    }
    return true;
  }

  openModalNewRoom() {
    const dialogRef = this.dialog.open(NovaSalaModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((editedRoom) => {
      if (editedRoom) {
        this.applyFilters();
      }
    });
  }

  openModal(data: any): void {
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

  atualiza(e: MatOptionSelectionChange) {
    this.teacher = e.source.value;
  }

  applyFilters() {
    this.showRooms = true;
    this.filterRooms();
  }

  ngOnInit() {
    this.teachers = this.roomsService.teachers;
  }
}
