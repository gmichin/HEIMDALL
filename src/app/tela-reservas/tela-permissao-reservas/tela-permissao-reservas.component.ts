import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from '../tela-reservas.component';

interface Sala {
  numero: number;
  professor: string;
  materia: string;
  dia: Date;
}
@Component({
  selector: 'app-tela-permissao-reservas',
  templateUrl: './tela-permissao-reservas.component.html',
  styleUrl: './tela-permissao-reservas.component.scss'
})
export class TelaPermissaoReservasComponent {
  requests: any[] = [];
  displayedColumns: string[] = ['accept', 'numero', 'professor', 'materia', 'dia'];
  dataSource = new MatTableDataSource<Sala>(this.requests);
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private salaDataService: SalaDataService
  ){    
    this.salaDataService.reservasRequestData$.subscribe((salas) => {
      this.requests = salas;
      this.dataSource.data = this.requests; 
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  acceptRow(sala: Sala) {
    const acceptedData = [{
      "numero": sala.numero,
      "professor": sala.professor,
      "materia": sala.materia,
      "dia": sala.dia.toString() // Converte para string para manter o formato desejado
    }];
    console.log(acceptedData); // Você pode fazer o que quiser com os dados aceitos, como enviá-los para algum serviço ou exibi-los
  }
}
