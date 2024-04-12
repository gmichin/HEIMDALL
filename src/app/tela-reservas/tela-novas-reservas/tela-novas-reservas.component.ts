import { Component, Inject , OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { map } from 'rxjs/operators';
import { TelaReservasComponent } from '../tela-reservas.component';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';


@Component({
  selector: 'app-tela-novas-reservas',
  templateUrl: './tela-novas-reservas.component.html',
  styleUrl: './tela-novas-reservas.component.scss'
})
export class TelaNovasReservasComponent implements OnInit{
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
  error: string = '';
  showPickers: boolean = true;
  novasReservas: any[] = [];
  numeroSalaSelecionada: string = '';
  professorSelecionado: string = ''; 
  materiasPorProfessor: string[] = [];
  materiaSelecionada: string = '';

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

  ngOnInit(): void {
    this.generateHours();
  }

  filtroCalendar(): void {
    if (this.startTime && this.endTime && this.startTime > this.endTime) {
      this.error = 'O horário de início deve ser menor que o horário de término';
      this.endTime = ''; // Limpa o valor do endTime
      this.showPickers = false; // Esconde os pickers se houver erro
    } else {
      this.error = ''; // Limpa a mensagem de erro se não houver erro
      this.carregarDiasDesabilitados(this.startTime, this.endTime);
      this.showPickers = true; // Mostra os pickers se não houver erro
    }
  }

  carregarDiasDesabilitados(startTime: string, endTime: string): void {
    this.salaDataService.salaReservaData$.subscribe((diasDesabilitados) => {
      this.diasDesabilitados = diasDesabilitados.map((obj: any) => {
        return { ...obj, dia: new Date(obj.dia) };
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
          diaDesabilitado.numero === this.numeroSalaSelecionada && // Verifica se o número da sala corresponde
          this.isSameDay(date, diaDesabilitado.dia) && // Verifica se o dia corresponde
          this.isBetweenTimes(diaDesabilitado.dia, startTime, endTime) // Verifica se o horário corresponde
        );
        return dayWeek !== 0 && date >= todayDay && !isDisabled;
      };
    });
  }
  
  
  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  
  isBetweenTimes(date: Date, startTime: string, endTime: string): boolean {
    const startTimeParts = startTime.split(':').map(part => parseInt(part, 10));
    const endTimeParts = endTime.split(':').map(part => parseInt(part, 10));
  
    const startDateTime = new Date(date);
    startDateTime.setHours(startTimeParts[0], startTimeParts[1], startTimeParts[2] || 0, 0);
  
    const endDateTime = new Date(date);
    endDateTime.setHours(endTimeParts[0], endTimeParts[1], endTimeParts[2] || 0, 0);
  
    return date >= startDateTime && date <= endDateTime;
  }
  applyDateRange() {
    if (this.startDate && this.endDate) {
      const dateRange = this.getDateRangeArray(this.startDate, this.endDate);
  
      dateRange.forEach(date => {
        const selectedStartTime = this.getStartTime();
        const selectedEndTime = this.getEndTime();
  
        const existingIndex = this.diasSelecionados.findIndex(selectedDate =>
          this.isSameDay(selectedDate, date)
        );
  
        if (existingIndex !== -1) {
          this.diasSelecionados.splice(existingIndex, 1);
        } else {
          this.addTimeRangeToSelectedDates(date, selectedStartTime, selectedEndTime);
        }
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
  
      const existingIndex = this.diasSelecionados.findIndex(date =>
        selectedDateTimeList.some(dateTime => this.isSameDay(date, dateTime))
      );
  
      if (existingIndex === -1) {
        this.diasSelecionados.push(...selectedDateTimeList);
      } else {
        const selectedDateTimeToRemove = selectedDateTimeList.find(dateTime =>
          this.isSameDay(dateTime, this.diasSelecionados[existingIndex])
        );
        if (selectedDateTimeToRemove) {
          this.diasSelecionados.splice(existingIndex, 1);
        }
      }
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
      this.isSameDay(date, diaDesabilitado.dia)
    );


    return dayWeek !== 0 && dayWeek !== 6 && date >= todayDay && !isDisabled;
  }
  generateHours(): void {
    for (let i = 5; i < 23; i++) {
      const hour = i < 10 ? '0' + i : '' + i;
      this.hours.push(hour + ':00');
    }
  }

  selectMateria(materia: string){
    this.materiaSelecionada = materia;
  }

  selectSala(numeroSala: string) {
    this.numeroSalaSelecionada = numeroSala;
  }
  
  selectProfessor(nomeProfessor: string) {
    this.professorSelecionado = nomeProfessor;
    
    this.salaDataService.teacherData$.pipe(
      map(professores => {
        return professores.filter(professor => professor.nome === nomeProfessor)
                          .map(professor => professor.materia);
      })
    ).subscribe(materias => {
      this.materiasPorProfessor = materias;
    });
  }
  public saveDate() {
    this.novasReservas = [];
  
    this.diasSelecionados.forEach(dia => {
      const reserva = {
        numero: this.numeroSalaSelecionada,
        professor: this.professorSelecionado, 
        materia: this.materiaSelecionada, 
        dia: dia 
      };
      this.novasReservas.push(reserva);
    });
  
    console.log(this.novasReservas);
  }
}
