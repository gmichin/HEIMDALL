import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';


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
  styleUrl: './tela-salas-feitas.component.scss'
})
export class TelaSalasFeitasComponent {
  salas: Sala[] = [];
  displayedColumns: string[] = ['numero', 'cadeiras','mesas','cadeirasPorMesa','computadores','lousa','projetor','status','remove'];
  dataSource = new MatTableDataSource<Sala>(this.salas);

  constructor(
    private salaDataService: SalaDataService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.salaDataService.salaData$.subscribe((salas) => {
      this.salas = salas;
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
    this.router.navigate(['/tela-novas-salas']);
  }

  removeData() {
    this.router.navigate(['/tela-deletar-salas']);
  }

  
  removeRow(sala: Sala){
    const index = this.salas.findIndex(item => item === sala);
    
    if (index !== -1) {
      this.salas.splice(index, 1);
      this.dataSource.data = [...this.salas]; 
    }
  }
}
