import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { TelaSalasComponent } from '../tela-salas.component';

@Component({
  selector: 'app-tela-novas-salas',
  templateUrl: './tela-novas-salas.component.html',
  styleUrl: './tela-novas-salas.component.scss'
})
export class TelaNovasSalasComponent {
numeroSalas: number = 0;
numeroCadeiras: number = 0;
numeroMesas: number = 0;
cadeirasPorMesa: number = 0;
numeroComputadores: number = 0;
capacidade: number = 0;
projetor: number = 0;
status: boolean = true;

newSala: any[] = [];

  constructor(public dialog: MatDialog) {}

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
  save(){
    this.newSala = [];
    let available = "";
    if(this.status==true){
      available = "available";
    }else if(this.status==false){
      available = "unvailable";
    }
    const reserva = {
      number: this.numeroSalas,
      chairs: this.numeroCadeiras,
      tables: this.numeroMesas,
      chairByTables: this.cadeirasPorMesa,
      computers: this.numeroComputadores,
      capacity: this.capacidade,
      projectors: this.projetor,
      status: available
    };
    this.newSala.push(reserva);
    console.log(this.newSala);
  }
}
