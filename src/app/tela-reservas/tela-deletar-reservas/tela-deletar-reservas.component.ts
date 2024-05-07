import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from '../tela-reservas.component';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';

interface Sala {
  numero: number;
  professor: string;
  materia: string;
  dia: Date;
}

@Component({
  selector: 'app-tela-deletar-reservas',
  templateUrl: './tela-deletar-reservas.component.html',
  styleUrl: './tela-deletar-reservas.component.scss'
})
export class TelaDeletarReservasComponent {
  escolha: string = ''; 
  sala: string = ''; 
  salaSelecionada: string = '';
  professorNomes: string[] = [];
  numeroSala: string[] = [];
  materia: string[] = [];
  dia: string[] = [];
  reservasAchadas: Sala[] = [];
  todasReservas: any[] = [];

  displayedColumns: string[] = ['numero', 'professor', 'materia', 'dia', 'remove'];
  dataSource = new MatTableDataSource<Sala>(this.reservasAchadas);


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private salaDataService: SalaDataService
  ) {
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.numeroSala = salas.map((sala) => sala.numero);
    });
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.professorNomes = salas.map((sala) => sala.professor);
    });
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.materia = salas.map((sala) => sala.materia);
    });
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.dia = salas.map((sala) => sala.dia);
    });
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.todasReservas = salas;
    })
    this.salaDataService.salaReservaData$.subscribe(() => {
      this.dataSource.data = this.reservasAchadas; 
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
  openHome(){
    this.router.navigate(['']);
  }

  procurarSala(selectedValue: string){
    this.reservasAchadas = [];
    this.todasReservas.forEach(reserva => {
      if (reserva.numero === selectedValue ||
          reserva.professor === selectedValue ||
          reserva.materia === selectedValue ||
          reserva.dia === selectedValue) {
          this.reservasAchadas.push(reserva);
      }
    });
  }
  
  removeRow(sala: Sala){
    const index = this.reservasAchadas.findIndex(item => item === sala);
    
    if (index !== -1) {
      this.reservasAchadas.splice(index, 1);
      this.dataSource.data = [...this.reservasAchadas]; 
    }
  }

  deleteReserva(){
    console.log(this.reservasAchadas);
  }
}
