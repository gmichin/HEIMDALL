import { Component } from '@angular/core';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservaService } from '../services/tela-reserva.service';
import { TelaReservaDetalhadasComponent } from 'src/app/tela-reservas/tela-reserva-detalhadas/tela-reserva-detalhadas.component'

@Component({
  selector: 'app-tela-reservas',
  templateUrl: './tela-reservas.component.html',
  styleUrls: ['./tela-reservas.component.scss']
})
export class TelaReservasComponent {
  sala = [
    {
      "numero": 107,
      "cadeiras": 25,
      "mesas": 5,
      "cadeiras/mesa": 5,
      "computadores": 25,
      "lousa": 1,
      "projetor": 1
    },
    {
      "numero": 100,
      "cadeiras": 20,
      "mesas": 5,
      "cadeiras/mesa": 4,
      "computadores": 0,
      "lousa": 1,
      "projetor": 1
    }
  ];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private ReservaService: ReservaService
  ) {}

    public redirectProfile() {
      const dialogT = this.dialog.open(TelaPerfilComponent, {
        width: '400px',
      });
      dialogT.afterClosed().subscribe(() => {
        this.dialogCloseSubs();
      });
    }
  
    public redirectReserve() {
      this.router.navigate(['/tela-reservas']);
    }

    public abrirDetalhesSala(sala: any) {
      this.ReservaService.reservarSala(sala);
      this.dialog.open(TelaReservaDetalhadasComponent, {
        width: '400px',
        data: sala
      });
    }

    private dialogCloseSubs() {
      this.router.navigate(['reload']);
    }
}
