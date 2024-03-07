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
  diasDesabilitadosCarregados: boolean = false;
  startDate!: Date | null;
  endDate!: Date | null;
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
      console.log(this.diasSelecionados);
    }
   
  ngOnInit(): void {
    this.carregarDiasDesabilitados();
  }

  carregarDiasDesabilitados(): void {
    this.CalendarioService.diasDesabilitados$.subscribe((diasDesabilitados) => {

      this.diasDesabilitados = diasDesabilitados.map((str: string) => {
        const [dia, mes, ano] = str.split("-").map(Number);
        return { dia, mes, ano };
      });

      this.diasDesabilitadosCarregados = true;

      this.dateFilter = (date: Date | null) => {
        if (!this.diasDesabilitadosCarregados || !date) {
          return true;
        }

        const dayWeek = date.getDay();
        const today = new Date();
        const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const isDisabled = this.diasDesabilitados.some(diaDesabilitado =>
          this.isSameDay(date, new Date(diaDesabilitado.ano, diaDesabilitado.mes - 1, diaDesabilitado.dia))
        );
        return dayWeek !== 0 && dayWeek !== 6 && date >= todayDay && !isDisabled;
      };
    });
  }
  applyDateRange() {
    if (this.startDate && this.endDate) {
      const dateRange = this.getDateRangeArray(this.startDate, this.endDate);
  
      dateRange.forEach(date => {
        const index = this.diasSelecionados.findIndex(selectedDate => this.isSameDay(selectedDate, date));
  
        if (index === -1) {
          this.diasSelecionados.push(date);
        }
      });
    }
  }
  private getDateRangeArray(startDate: Date, endDate: Date): Date[] {
    const dateArray: Date[] = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      // Verificar as condições antes de adicionar a data ao array
      const dayWeek = currentDate.getDay();
      const today = new Date();
      const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isDisabled = this.diasDesabilitados.some(diaDesabilitado =>
        this.isSameDay(currentDate, new Date(diaDesabilitado.ano, diaDesabilitado.mes - 1, diaDesabilitado.dia))
      );
  
      if (dayWeek !== 0 && dayWeek !== 6 && currentDate >= todayDay && !isDisabled) {
        dateArray.push(new Date(currentDate));
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dateArray;
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

  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    if (!this.diasDesabilitadosCarregados || !date) {
      return true;
    }

    const dayWeek = date.getDay();
    const today = new Date();
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const isDisabled = this.diasDesabilitados.some(diaDesabilitado =>
      this.isSameDay(date, new Date(diaDesabilitado.ano, diaDesabilitado.mes - 1, diaDesabilitado.dia))
    );


    return dayWeek !== 0 && dayWeek !== 6 && date >= todayDay && !isDisabled;
  }
}