import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from '../tela-reservas.component';
import { SalaDataService } from 'src/app/services/sala-data.service';

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
  reservasAchadas: any[] = [];
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
  
  selectSala(selectedValue: string, attribute: string) {
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.reservasAchadas = salas.filter((sala) => {
        return sala[attribute] === selectedValue;
      });
    });
  }
  deleteReserva(){
    console.log(this.reservasAchadas);
  }
}
