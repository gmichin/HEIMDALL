import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from '../tela-reservas.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { combineLatest, firstValueFrom } from 'rxjs';

interface Sala {
  room_id: string;
  user_id: string | undefined;
  class_id: string | undefined;
  start_time: Date;
  end_time: Date;
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
    ]).subscribe(([reservas, salas, teachers, classes]) => {
      console.log('Reservas:', reservas);
      console.log('Salas:', salas);
      console.log('Professores:', teachers);
      console.log('Classes:', classes);

      if (reservas.length === 0) {
        console.error('Nenhum dado de reserva encontrado.');
        return; // Saia da função se não houver dados de reserva
      }
      
      this.salas = reservas.map(reserva => {
        const sala = salas.find(s => s._id === reserva.room_id);
        const teacher = teachers.find(t => t._id === reserva.user_id);
        const classInfo = classes.find(c => c._id === reserva.class_id);
    
        const updatedReserva = {
          ...reserva,
          room_id: sala ? sala.number : reserva.room_id,
          user_id: teacher ? teacher.name : reserva.user_id,
          class_id: classInfo ? classInfo.name : reserva.class_id
        };
    
        console.log('Reserva Original:', reserva);
        console.log('Reserva Atualizada:', updatedReserva);
    
        return updatedReserva;
      });
    
      console.log('Salas Atualizadas:', this.salas);
      this.dataSource.data = this.salas;
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

  removeRow(sala: Sala) {
    const index = this.salas.findIndex(item => item === sala);
    if (index !== -1) {
      this.salas.splice(index, 1);
      this.dataSource.data = [...this.salas]; 
    }
  }
}
