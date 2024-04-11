import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table'; 
import { Router } from '@angular/router';

interface Sala {
  numero: number;
  professor: string;
  materia: string;
  dia: Date;
}

@Component({
  selector: 'app-tela-reservas-feitas',
  templateUrl: './tela-reservas-feitas.component.html',
  styleUrls: ['./tela-reservas-feitas.component.scss']
})
export class TelaReservasFeitasComponent {
  salas: Sala[] = [];
  displayedColumns: string[] = ['numero', 'professor', 'materia', 'dia'];
  dataSource = new MatTableDataSource<Sala>(this.salas);

  constructor(
    private salaDataService: SalaDataService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.salaDataService.salaReservaData$.subscribe((salas) => {
      this.salas = salas;
      this.dataSource.data = this.salas; // Atualize o dataSource.data com os novos dados
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

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
    this.salas.pop();
    this.dataSource.data = this.salas;
    this.table.renderRows();
  }
}
