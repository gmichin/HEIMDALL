import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GetRoomsService } from 'src/app/services/get-rooms.service';
import { EditarModalComponent } from '../editar-modal/editar-modal.component';

@Component({
  selector: 'app-sala-modal',
  templateUrl: './sala-modal.component.html',
  styleUrls: ['./sala-modal.component.scss'],
})
export class SalaModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomsService: GetRoomsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditarModalComponent>
  ) {}

  private index = this.roomsService.rooms.indexOf(this.data);

  ngOnInit(): void {}

  deleteRoom(room: any) {
    const index = this.roomsService.rooms.indexOf(room);
    if (index !== -1) {
      this.roomsService.rooms.splice(index, 1);
    }
  }

  openEditRoomDialog(data: any) {
    const dialogRef = this.dialog.open(EditarModalComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((editedRoom) => {
      if (editedRoom) {
        this.data = editedRoom;
        this.dialogRef.close(editedRoom);
      }
    });
  }
}
