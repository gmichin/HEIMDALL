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
  diasSelecionados: Date[] = []
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
      console.log();
    }
   
  ngOnInit(): void {
    this.carregarDiasDesabilitados();
  }

  carregarDiasDesabilitados(): void {
    this.CalendarioService.diasDesabilitados$.subscribe((diasDesabilitados) => {
      this.diasDesabilitados = diasDesabilitados;
      console.log(diasDesabilitados);
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
    

    return dayWeek !== 0 && dayWeek !== 6;
  }

}