import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';


@Component({
  selector: 'app-tela-deletar-salas',
  templateUrl: './tela-deletar-salas.component.html',
  styleUrl: './tela-deletar-salas.component.scss'
})
export class TelaDeletarSalasComponent {
  escolha: string = ''; 
  sala: string = ''; 
  salaSelecionada: string = '';
  professorNomes: string[] = [];
  numeroSala: string[] = [];
  materia: string[] = [];
  dia: string[] = [];
  salasAchadas: any[] = [];
  todasSalas: any[] = [];

  displayedColumns: string[] = ['selecionar','numero','cadeiras','mesas','cadeirasPorMesa','computadores','lousa','projetor','status', 'remove'];

  selection = new SelectionModel<any>(true, []);

  constructor(
    public dialog: MatDialog,
    private salaDataService: SalaDataService
  ) {
    this.salaDataService.carregarDadosSalas().subscribe((salas) => {
      this.numeroSala = salas.map((sala) => sala.number).filter((value, index, self) => self.indexOf(value) === index);
      this.todasSalas = salas;
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
    this.salasAchadas = [];
    this.todasSalas.forEach(sala => {
      if (sala.number === selectedValue) {
          this.salasAchadas.push(sala);
      }
    });
  }
  
  removeRow(sala: any){
    const index = this.salasAchadas.findIndex(item => item === sala);
    
    if (index !== -1) {
      this.salasAchadas.splice(index, 1);
    }
  }

  deleteReserva(){
    console.log(this.salasAchadas);
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.salasAchadas.forEach(row => this.selection.select(row));
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.salasAchadas.length;
    return numSelected === numRows;
  }
}