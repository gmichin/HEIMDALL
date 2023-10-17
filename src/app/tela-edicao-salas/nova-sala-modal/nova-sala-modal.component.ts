import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Rooms } from 'src/app/models/rooms.model';
import { GetRoomsService } from 'src/app/services/get-rooms.service';

@Component({
  selector: 'app-nova-sala-modal',
  templateUrl: './nova-sala-modal.component.html',
  styleUrls: ['./nova-sala-modal.component.scss'],
})
export class NovaSalaModalComponent implements OnInit {
  sala: Rooms = <Rooms>{};
  teachers: any[] = [];
  schedules: any[] = [];
  disableSelect = new FormControl(false);

  constructor(
    public dialogRef: MatDialogRef<NovaSalaModalComponent>,
    private roomsService: GetRoomsService
  ) {}
  ngOnInit(): void {
    this.teachers = this.roomsService.teachers;
    this.schedules = this.roomsService.schedules;
  }

  public atualiza(e: MatOptionSelectionChange, type: string) {
    if (type == 'horario') {
      this.sala.schedule = e.source.value;
      return;
    }
    this.sala.teacher = e.source.value;
  }

  editarSala() {
    if (
      this.sala.description.trim() !== '' &&
      this.sala.name.trim() !== '' &&
      this.sala.seats > 0 &&
      this.sala.teacher.trim() !== '' &&
      this.sala.schedule.trim() !== ''
    ) {
      this.roomsService.rooms.push(this.sala);
      this.dialogRef.close(this.sala);
    } else {
      return;
    }
  }
}
