import { Component, Inject , OnInit } from '@angular/core';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SalaDataService } from 'src/app/services/sala-data.service';


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
  singleDate!: Date;
  numeroSala: string[] = [];
  professorNomes: string[] = [];
  hours: string[] = [];
  startTime: string = ''; 
  endTime: string = '';  

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private salaDataService: SalaDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.salaDataService.teacherData$.subscribe((professores) => {
      const uniqueProfessorNames = Array.from(new Set(professores.map(professor => professor.nome)));
      this.professorNomes = uniqueProfessorNames;
    });
    this.salaDataService.salaData$.subscribe((salas) => {
      this.numeroSala = salas.map((sala) => sala.numero);
    });
  }

  ngOnInit(): void {
    this.carregarDiasDesabilitados();
    this.generateHours();
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

  private dialogCloseSubs() {
    this.router.navigate(['reload']);
  }
  carregarDiasDesabilitados(): void {
    this.salaDataService.diasDesabilitados$.subscribe((diasDesabilitados) => {

      this.diasDesabilitados = diasDesabilitados.map((obj: any) => {
        const [dia, mes, ano] = obj.dia.split("-").map(Number);
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
        const selectedStartTime = this.getStartTime();
        const selectedEndTime = this.getEndTime();
  
        this.addTimeRangeToSelectedDates(date, selectedStartTime, selectedEndTime);
      });
    }
  }
  getStartTime(): string {
    return this.startTime;
  }
  
  getEndTime(): string {
    return this.endTime;
  }

  addTimeRangeToSelectedDates(date: Date, startTime: string, endTime: string) {
    const selectedDate = new Date(date);
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
  
    for (let hour = startHour; hour <= endHour; hour++) {
      const fullHour = hour < 10 ? '0' + hour : '' + hour;
      const time = fullHour + ':00';
  
      selectedDate.setHours(hour);
      this.diasSelecionados.push(new Date(selectedDate));
    }
  }
  
  private getDateRangeArray(startDate: Date, endDate: Date): Date[] {
    const dateArray: Date[] = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
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

  applyDate() {
    if (this.singleDate && this.startTime && this.endTime) {
      const selectedDate = new Date(this.singleDate);
      const startHour = parseInt(this.startTime.split(':')[0]);
      const endHour = parseInt(this.endTime.split(':')[0]);
      const selectedDateTimeList: Date[] = [];
  
      for (let hour = startHour; hour <= endHour; hour++) {
        const fullHour = hour < 10 ? '0' + hour : '' + hour;
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hour);
        selectedDateTimeList.push(selectedDateTime);
      }
  
      this.diasSelecionados.push(...selectedDateTimeList);
    }
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
  generateHours(): void {
    for (let i = 5; i < 23; i++) {
      const hour = i < 10 ? '0' + i : '' + i;
      this.hours.push(hour + ':00');
    }
  }

  public saveDate() {
    console.log(this.diasDesabilitados);
    console.log(this.diasSelecionados);
  }  
}