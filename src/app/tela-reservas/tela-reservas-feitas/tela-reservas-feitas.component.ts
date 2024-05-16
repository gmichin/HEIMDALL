import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from '../tela-reservas.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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

  constructor(
    private salaDataService: SalaDataService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.salaDataService.salaReservaData$
      .pipe(
        switchMap((reservas) => {
          this.salas = reservas;
          this.idSalaReservada = reservas.map((reserva) => reserva.room_id);

          return forkJoin([
            this.salaDataService.salaData$,
            this.salaDataService.teacherData$,
            this.salaDataService.classData$
          ]);
        }),
        map(([salas, professores, classes]) => {
          const salasFiltradas = salas.filter((sala) => this.idSalaReservada.includes(sala._id));
          const numeroSala = salasFiltradas.map((sala) => ({ id: sala._id, number: sala.number }));
          const professoresMap = professores.reduce((acc, prof) => {
            acc[prof._id] = prof.name;
            return acc;
          }, {});
          const classesMap = classes.reduce((acc, classe) => {
            acc[classe._id] = classe.name;
            return acc;
          }, {});

          return { salasFiltradas, numeroSala, professoresMap, classesMap };
        })
      )
      .subscribe(({ salasFiltradas, numeroSala, professoresMap, classesMap }) => {
        this.salas.forEach((reserva) => {
          const salaCorrespondente = salasFiltradas.find((sala) => sala._id === reserva.room_id);
          if (salaCorrespondente) {
            reserva.room_id = salaCorrespondente.number;
          }
          if (professoresMap[reserva.user_id]) {
            reserva.user_id = professoresMap[reserva.user_id];
          }
          if (classesMap[reserva.class_id]) {
            reserva.class_id = classesMap[reserva.class_id];
          }
        });
        this.dataSource.data = this.salas;
        console.log(this.dataSource.data);
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
