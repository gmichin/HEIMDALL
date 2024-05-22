import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface Sala {
  number: number;
  cadeiras: number;
  mesas: number;
  cadeirasPorMesa: number;
  computadores: number;
  capacidade: number;
  projetor: number;
  status: string;
}

@Component({
  selector: 'app-tela-permissao-salas',
  templateUrl: './tela-permissao-salas.component.html',
  styleUrls: ['./tela-permissao-salas.component.scss']
})
export class TelaPermissaoSalasComponent implements OnInit {
  isMobile = false;
  requests: any[] = [];
  displayedColumns: string[] = ['accept', 'numero', 'cadeiras', 'mesas', 'cadeirasPorMesa', 'computadores', 'lousa', 'projetor', 'status', 'remove'];
  dataSource = new MatTableDataSource<Sala>(this.requests);

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private salaDataService: SalaDataService
  ){    
    this.salaDataService.carregarDadosSalas().subscribe((salas) => {
      this.requests = salas;
      this.dataSource.data = this.requests;
    });
  }
  ngOnInit(): void {
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

  acceptRow(sala: Sala) {
    const index = this.requests.findIndex(item => item === sala);
    if (index !== -1) {
      this.requests.splice(index, 1);
      this.dataSource.data = [...this.requests];
    }

    const acceptedData = [{
      "number": sala.number,
      "chairs": sala.cadeiras,
      "tables": sala.mesas,
      "chairByTables": sala.cadeirasPorMesa,
      "computers": sala.computadores,
      "capacity": sala.capacidade,
      "projectors": sala.projetor,
      "status": sala.status
    }];

    console.log(acceptedData);
  }

  removeRow(sala: Sala) {
    const index = this.requests.findIndex(item => item === sala);
    if (index !== -1) {
      this.requests.splice(index, 1);
      this.dataSource.data = [...this.requests];
    }
  }
}