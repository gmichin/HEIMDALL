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

  professor: any;
  idProfessoresReservados: string[] = [];
  professorNomes: string[] = [];
  teacherFiltrado: any[] = [];

  salaName: any;
  idSalaReservada: string[] = [];
  numeroSala: string[] = [];
  salasFiltradas: any[] = [];

  materiaName: any;
  idMateriaReservada: string[] = [];
  materia: string[] = [];
  classFiltrado: any[] = [];

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
      this.numeroReservas();
    });
    
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.idProfessoresReservados = salas.map((sala) => sala.user_id);
      this.nomeProfessores();
    });

    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.idMateriaReservada = salas.map((sala) => sala.class_id);
      this.materiasReserva();
    });


    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.dia = salas.map((sala) => sala.start_time);
    });
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.todasReservas = salas;
      console.log(this.todasReservas);
    })
  }

  materiasReserva(){
    this.salaDataService.classData$.subscribe((classes) => {
      this.classFiltrado = classes.filter((classe) => this.idMateriaReservada.includes(classe._id));
      this.materia = this.classFiltrado.map((classe) => classe.name).filter(name => typeof name === 'string' && name.trim() !== '');
    });
  }
  nomeProfessores(){
    this.salaDataService.teacherData$.subscribe((teachers) => {
      this.teacherFiltrado = teachers.filter((teacher) => this.idProfessoresReservados.includes(teacher._id));
      console.log(this.teacherFiltrado)
      this.professorNomes = this.teacherFiltrado.map((teacher) => teacher.name).filter(name => typeof name === 'string' && name.trim() !== '');;
    });
  }
  numeroReservas(){
    this.salaDataService.salaData$.subscribe((salas) => {
      this.salasFiltradas = salas.filter((sala) => this.idSalaReservada.includes(sala._id));
      this.numeroSala = this.salasFiltradas.map((sala) => sala.number);;
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
      if (this.escolha === "numero") {
        const professorName = this.teacherFiltrado.find(teacher => reserva.room_id === teacher._id);
        this.professor = this.teacherFiltrado.find(sala => sala.name === professorName.name);

        this.salaName = this.salasFiltradas.find(sala => sala.number === selectedValue);
        if (this.salaName && reserva.room_id === this.salaName._id) {
          this.reservasAchadas.push(reserva);
        }
      } else if (this.escolha === "professor") {
        const salasNumber = this.salasFiltradas.find(sala => reserva.room_id === sala._id);
        this.salaName = this.salasFiltradas.find(sala => sala.number === salasNumber.number);

        this.professor = this.teacherFiltrado.find(teacher => teacher.name === selectedValue);
        if (this.professor && reserva.user_id === this.professor._id) {
          this.reservasAchadas.push(reserva);
        }
      } else if (this.escolha === "materia") {
        const salasNumber = this.salasFiltradas.find(sala => reserva.room_id === sala._id);
        this.salaName = this.salasFiltradas.find(sala => sala.number === salasNumber.number);

        this.materiaName = this.classFiltrado.find(classe => classe.name === selectedValue);
        if (this.materiaName && reserva.class_id === this.materiaName._id) {
          this.reservasAchadas.push(reserva);
        }
      } else if (this.escolha === "dia" && reserva.start_time === selectedValue) {
        const salasNumber = this.salasFiltradas.find(sala => reserva.room_id === sala._id);
        this.salaName = this.salasFiltradas.find(sala => sala.number === salasNumber.number);
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
