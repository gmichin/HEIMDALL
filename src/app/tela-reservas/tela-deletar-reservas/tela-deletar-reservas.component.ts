import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from '../tela-reservas.component';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';

interface Sala {
  _id: string;
  room_id: string;
  user_id: string;
  class_id: string;
  start_time: string;
  end_time: string;
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

  idProfessoresReservados: string[] = [];
  professorNomes: string[] = [];

  idSalaReservada: string[] = [];
  numeroSala: string[] = [];

  idMateriaReservada: string[] = [];
  materia: string[] = [];

  dia: string[] = [];
  reservasAchadas: Sala[] = [];
  todasReservas: any[] = [];

  displayedColumns: string[] = ['selecionar','numero', 'professor', 'materia', 'dia', 'remove'];

  selection = new SelectionModel<any>(true, []);

  constructor(
    public dialog: MatDialog,
    private salaDataService: SalaDataService
  ) {
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.idSalaReservada = salas.map((sala) => sala.room_id);
      console.log("id salas reservas: ",this.idSalaReservada);
      this.numeroReservas();
    });
    
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.idProfessoresReservados = salas.map((sala) => sala.user_id);
      console.log("id reservas de professores: ",this.idProfessoresReservados);
      this.nomeProfessores();
    });

    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.idMateriaReservada = salas.map((sala) => sala.class_id);
      console.log("id das materias reservadas: ",this.idProfessoresReservados);
      this.materiasReserva();
    });


    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.dia = salas.map((sala) => sala.start_time);
    });
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.todasReservas = salas;
    })
  }

  materiasReserva(){
    this.salaDataService.classData$.subscribe((classes) => {
      const classFiltrado = classes.filter((classe) => this.idProfessoresReservados.includes(classe._id));
      console.log("filtro de classes: ", classFiltrado);
      this.professorNomes = classFiltrado.map((classe) => classe.name);
    });
  }
  nomeProfessores(){
    this.salaDataService.teacherData$.subscribe((teachers) => {
      const teacherFiltrado = teachers.filter((teacher) => this.idProfessoresReservados.includes(teacher._id));
      console.log("filtro de professores: ",teacherFiltrado);
      this.professorNomes = teacherFiltrado.map((teacher) => teacher.name);
    });
  }
  numeroReservas(){
    this.salaDataService.salaData$.subscribe((salas) => {
      const salasFiltradas = salas.filter((sala) => this.idSalaReservada.includes(sala._id));
      console.log("filtro de salas: ",salasFiltradas);
      this.numeroSala = salasFiltradas.map((sala) => sala.number);
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
  
  procurarSala(selectedValue: string){
    this.reservasAchadas = [];
    this.todasReservas.forEach(reserva => {
      if (reserva.room_id === selectedValue ||
          reserva.user_id === selectedValue ||
          reserva.class_id === selectedValue ||
          reserva.start_time === selectedValue) {
          this.reservasAchadas.push(reserva);
      }
    });
  }
  
  removeRow(sala: Sala){
    const index = this.reservasAchadas.findIndex(item => item === sala);
    
    if (index !== -1) {
      this.reservasAchadas.splice(index, 1);
    }
  }

  deleteReserva(){
    console.log(this.reservasAchadas);
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.reservasAchadas.forEach(row => this.selection.select(row));
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.reservasAchadas.length;
    return numSelected === numRows;
  }
}
