import { Component } from '@angular/core';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservaService } from '../services/tela-reserva.service';
import { TelaReservaDetalhadasComponent } from 'src/app/tela-reservas/tela-reserva-detalhadas/tela-reserva-detalhadas.component'
import { NewTelaReservaComponent } from 'src/app/tela-reservas/new-tela-reserva/new-tela-reserva.component'
import { SalaDataService } from '../services/sala-data.service';

@Component({
  selector: 'app-tela-reservas',
  templateUrl: './tela-reservas.component.html',
  styleUrls: ['./tela-reservas.component.scss']
})
export class TelaReservasComponent {
  sala: any[] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private ReservaService: ReservaService,
    private salaDataService: SalaDataService
  ) {
    this.salaDataService.salaData$.subscribe(data => {
      this.sala = data;
    });
  }

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
      const detalhesSala = this.salaDataService.obterDetalhesSala(sala.numero);
      this.dialog.open(TelaReservaDetalhadasComponent, {
        width: '400px',
        data: detalhesSala,
      });
    }

    public novaSala() {
      this.dialog.open(NewTelaReservaComponent, {
        width: '400px'
      });
    }

    private dialogCloseSubs() {
      this.router.navigate(['reload']);
    }

    adicionarNovaSala(novaSala: any) {
      this.sala.push(novaSala);
    }
}