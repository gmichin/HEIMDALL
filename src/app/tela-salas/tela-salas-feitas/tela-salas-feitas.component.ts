import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { SelectionModel } from '@angular/cdk/collections';
import { RoomsModel } from 'src/app/models/rooms.model';
import { RoomService } from 'src/app/services/room.service';


interface Sala {
  number: number;
  cadeiras: number;
  mesas: number;
  cadeirasPorMesa: number;
  computadores: number;
  capacidade: number;
  projetor: number;
  status : string;
}

@Component({
  selector: 'app-tela-salas-feitas',
  templateUrl: './tela-salas-feitas.component.html',
  styleUrls: ['./tela-salas-feitas.component.scss']
})
export class TelaSalasFeitasComponent {
  displayedColumns: string[] = ['remove','edit','numero', 'cadeiras', 'mesas', 'cadeirasPorMesa', 'computadores', 'lousa', 'projetor', 'status'];
  dataSource = new MatTableDataSource<RoomsModel>();
  selection = new SelectionModel<RoomsModel>(true, []);
  selectionReject = new SelectionModel<RoomsModel>(true, []);



  constructor(
    private salaDataService: SalaDataService,
    public dialog: MatDialog,
    private router: Router,
    private roomService: RoomService,
  ) {
    this.roomService.getRoomsByInst().subscribe({
      next: salas => {
        this.dataSource.data = salas;
      }
    });
  }

  openLoginSignUp() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openReservas() {
    const dialogRef = this.dialog.open(TelaReservasComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSalas() {
    const dialogRef = this.dialog.open(TelaSalasComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatTable)
  table!: MatTable<Sala>;

  editSala() {
  }

  apagarSalas() {
    this.router.navigate(['/tela-deletar-salas']);
  }

  // removeRow(sala: Sala) {
  //   const index = this.salas.findIndex(item => item === sala);

  //   if (index !== -1) {
  //     this.salas.splice(index, 1);
  //     this.dataSource.data = [...this.salas];
  //   }
  // }

  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach(row => {
      if(!this.selectionReject.isSelected(row)){
        this.selectionReject.select(row);
      }
    })
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }
}
