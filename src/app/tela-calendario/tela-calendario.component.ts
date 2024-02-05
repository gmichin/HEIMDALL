import { Component, OnInit } from '@angular/core';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-tela-calendario',
  templateUrl: './tela-calendario.component.html',
  styleUrls: ['./tela-calendario.component.scss'],
})
export class TelaCalendarioComponent implements OnInit {
  diasDesabilitados: string[] = [];
  dataAtual: Date = new Date();
  diasSelecionados: Date[] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient
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

   
  ngOnInit(): void {
    this.carregarDiasDesabilitados();
  }

  carregarDiasDesabilitados(): void {
    /*this.http.get<any>('caminho/para/seu/data.json').subscribe(data => {
      this.diasDesabilitados = data.diasDesabilitados;
    });*/
    this.diasDesabilitados = ['Sat Feb 03 2024 00:00:00 GMT-0300 (Horário Padrão de Brasília)', 'Sat Feb 10 2024 00:00:00 GMT-0300 (Horário Padrão de Brasília)'];
    console.log(this.diasDesabilitados);
  }

  diaClassFunction = (date: Date): MatCalendarCellCssClasses => {
    const dataString = date.toISOString().split('T')[0];
    const desabilitado = this.diasDesabilitados.includes(dataString) || date < this.dataAtual || this.isFinalDeSemana(date);
    const selecionado = this.diasSelecionados.some(selectedDate => this.isSameDay(selectedDate, date));
  
    return desabilitado ? 'dia-desabilitado' : selecionado ? 'dia-selecionado' : '';
  };
  
  isFinalDeSemana(date: Date): boolean {
    const diaDaSemana = date.getDay();
    return diaDaSemana === 0 || diaDaSemana === 6;
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
}