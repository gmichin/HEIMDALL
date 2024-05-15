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
  teacherFiltrado: any[] = [];

  salaName: any;
  idSalaReservada: string[] = [];
  numeroSala: string[] = [];
  salasFiltradas: any[] = [];

  idMateriaReservada: string[] = [];
  materia: string[] = [];

  dia: string[] = [];
  reservasAchadas: Sala[] = [];
  todasReservas: any[] = [];

  displayedColumns: string[] = ['selecionar','numero', 'professor', 'materia', 'dia', 'remove'];

  selection = new SelectionModel<any>(true, []);
  classFiltrado: any[] = [];

  constructor(
    public dialog: MatDialog,
    private salaDataService: SalaDataService
  ) {
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.idSalaReservada = salas.map((sala) => sala.room_id);
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
      this.classFiltrado = classes.filter((classe) => this.idProfessoresReservados.includes(classe._id));
      console.log("filtro de classes: ", this.classFiltrado);
      this.professorNomes = this.classFiltrado.map((classe) => classe.name);
    });
  }
  nomeProfessores(){
    this.salaDataService.teacherData$.subscribe((teachers) => {
      this.teacherFiltrado = teachers.filter((teacher) => this.idProfessoresReservados.includes(teacher._id));
      console.log("filtro de professores: ",this.teacherFiltrado);
      this.professorNomes = this.teacherFiltrado.map((teacher) => teacher.name);
    });
  }
  numeroReservas(){
    this.salaDataService.salaData$.subscribe((salas) => {
      this.salasFiltradas = salas.filter((sala) => this.idSalaReservada.includes(sala._id));
      this.numeroSala = this.salasFiltradas.map((sala) => sala.number);
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
    this.salaName = this.salasFiltradas.find(sala => sala.number === selectedValue);
    this.todasReservas.forEach(reserva => {
      if (this.escolha === "numero" && this.salaName && reserva.room_id === this.salaName._id) {
          this.reservasAchadas.push(reserva);
      } else if (this.escolha === "professor") {
        const professor = this.teacherFiltrado.find(teacher => teacher.name === selectedValue);
        if (professor && reserva.user_id === professor._id) {
          this.reservasAchadas.push(reserva);
        }
      } else if (this.escolha === "materia") {
        const materia = this.classFiltrado.find(classe => classe._id === selectedValue);
        if (materia && reserva.class_id === materia._id) {
          this.reservasAchadas.push(reserva);
        }
      } else if (this.escolha === "dia" && reserva.start_time === selectedValue) {
        this.reservasAchadas.push(reserva);
        console.log(reserva);
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
