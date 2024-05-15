import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from '../tela-reservas.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { combineLatest } from 'rxjs';

interface Sala {
  room_id: string;
  user_id: string;
  class_id: string;
  start_time: Date;
}

@Component({
  selector: 'app-tela-reservas-feitas',
  templateUrl: './tela-reservas-feitas.component.html',
  styleUrls: ['./tela-reservas-feitas.component.scss']
})
export class TelaReservasFeitasComponent {
  salas: Sala[] = [];
  displayedColumns: string[] = ['numero', 'professor', 'materia', 'dia', 'remove'];
  dataSource = new MatTableDataSource<Sala>(this.salas);
  idSalaReservada: any[] = [];
  salasFiltradas: any[] = [];
  numeroSala: any[] = [];
  professores: any[] = [];
  classes: any[] = [];

  constructor(
    private salaDataService: SalaDataService,
    public dialog: MatDialog,
    private router: Router
  ) {
    combineLatest([
      this.salaDataService.salaReservaData$,
      this.salaDataService.salaData$,
      this.salaDataService.teacherData$,
      this.salaDataService.classData$
    ]).subscribe(([reservas, salas, professores, classes]) => {
      this.salas = reservas;
      this.salasFiltradas = salas;
      this.professores = professores;
      this.classes = classes;
  
      this.processarReservas();
      this.dataSource.data = this.salas;
      console.log(this.dataSource.data);
    });
  }
  
  processarReservas() {
    this.idSalaReservada = this.salas.map(reserva => reserva.room_id);
    this.numeroReservas();
  }
  
  numeroReservas() {
    this.salas.forEach(reserva => {
      const salaCorrespondente = this.salasFiltradas.find(sala => sala._id === reserva.room_id);
      reserva.room_id = salaCorrespondente.number;
    });
    this.substituirUserIdPorNome();
  }
  
  substituirUserIdPorNome() {
    this.salas.forEach(reserva => {
      const professorCorrespondente = this.professores.find(prof => prof._id === reserva.user_id);
      reserva.user_id = professorCorrespondente.name;
    });
    this.substituirClassIdPorNome();
  }
  
  substituirClassIdPorNome() {
    this.salas.forEach(reserva => {
      const classeCorrespondente = this.classes.find(classe => classe._id === reserva.class_id);
      reserva.class_id = classeCorrespondente.name;
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

  addData() {
    this.router.navigate(['/tela-novas-reservas']);
  }

  removeData() {
    this.router.navigate(['/tela-deletar-reservas']);
  }

  
  removeRow(sala: Sala){
    const index = this.salas.findIndex(item => item === sala);
    
    if (index !== -1) {
      this.salas.splice(index, 1);
      this.dataSource.data = [...this.salas]; 
    }
  }
}
