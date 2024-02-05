import { Component, OnInit } from '@angular/core';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarioService } from '../services/calendario.service';

@Component({
  selector: 'app-tela-calendario',
  templateUrl: './tela-calendario.component.html',
  styleUrls: ['./tela-calendario.component.scss'],
})
export class TelaCalendarioComponent implements OnInit {
  diasDesabilitados: any[] = [];
  diasSelecionados: Date[] = [];
  dataAtual: Date = new Date();
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private CalendarioService: CalendarioService
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

    private dialogCloseSubs() {
      this.router.navigate(['reload']);
    }

    public saveDate() {
      console.log(this.diasDesabilitados);
    }
   
  ngOnInit(): void {
    this.carregarDiasDesabilitados();
  }

  carregarDiasDesabilitados(): void {
    this.CalendarioService.diasDesabilitados$.subscribe((diasDesabilitados) => {
      console.log(diasDesabilitados);
  
      // Converte os itens da matriz para objetos Date
      this.diasDesabilitados = diasDesabilitados.map((str: string) => {
        const [dia, mes, ano] = str.split("-").map(Number);
        return new Date(ano, mes - 1, dia);
      });
  
      console.log(this.diasDesabilitados);
    });
  }


  isSameDay(date1: Date, date2: Date): boolean {
      return (
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
      );
  }

  onClickDia(selectedDate: Date | null): void {
    if (selectedDate !== null) {
        const index = this.diasSelecionados.findIndex(date => this.isSameDay(date, selectedDate));

        if (index === -1) {
            this.diasSelecionados.push(selectedDate);
        } else {
            this.diasSelecionados.splice(index, 1);
        }
    }
    console.log(this.diasSelecionados);
  }
  
  dateFilter: (date: Date | null) => boolean =
  (date: Date | null) => {
    if (date === null) {
      return false;
    }

    const dayWeek = date.getDay();
    const today = new Date();
    const todayDay =  new Date(today.getFullYear(), today.getMonth(), today.getDate());
    


    return dayWeek !== 0 && dayWeek !== 6  && date >= todayDay && !this.diasDesabilitados[0];
  }

}