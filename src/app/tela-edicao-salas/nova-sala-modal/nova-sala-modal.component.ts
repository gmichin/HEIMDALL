import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GetRoomsService } from 'src/app/services/get-rooms.service';

@Component({
  selector: 'app-nova-sala-modal',
  templateUrl: './nova-sala-modal.component.html',
  styleUrls: ['./nova-sala-modal.component.scss'],
})
export class NovaSalaModalComponent implements OnInit {
  sala: {
    name: string;
    seats: number;
    description: string;
    teacher: string;
  } = <
    {
      name: string;
      seats: number;
      description: string;
      teacher: string;
    }
  >{};
  teachers: any[] = [];
  disableSelect = new FormControl(false);

  constructor(
    public dialogRef: MatDialogRef<NovaSalaModalComponent>,
    private roomsService: GetRoomsService
  ) {}
  ngOnInit(): void {
    this.teachers = this.roomsService.teachers;
  }

  atualiza(e: MatOptionSelectionChange) {
    this.sala.teacher = e.source.value;
  }

  editarSala() {
    if (
      this.sala.description.trim() !== '' &&
      this.sala.name.trim() !== '' &&
      this.sala.seats > 0 &&
      this.sala.teacher.trim() !== ''
    ) {
      this.roomsService.rooms.push(this.sala);
      this.dialogRef.close(this.sala);
    } else {
      return;
    }
  }
}
