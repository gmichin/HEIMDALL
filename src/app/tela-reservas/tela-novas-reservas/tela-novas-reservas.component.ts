import { Instituition, RegisterUserResponse } from './../../models/register.models';
import { Component, Inject , OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { map } from 'rxjs/operators';
import { TelaReservasComponent } from '../tela-reservas.component';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { InternsService } from 'src/app/services/interns.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ClassModel } from 'src/app/models/class.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassService } from 'src/app/services/class.service';
import { ReloadService } from 'src/app/services/reload.service';
import { CourseService } from 'src/app/services/course.service';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RoomService } from 'src/app/services/room.service';
import { RoomsModel } from 'src/app/models/rooms.model';
import { LoaderService } from 'src/app/services/loader.service';
import { ReserveModel } from 'src/app/models/reserve.model';
import { ReservationService } from 'src/app/services/reservation.service';


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
  hours: string[] = [];
  startTime: string = ''; 
  endTime: string = '';  
  error: string = '';
  showPickers: boolean = true;
  novasReservas: any[] = [];
  numeroSalaSelecionada: string = '';
  professorSelecionado: string = ''; 
  professores: any[] = [];
  materia: any[] = [];
  materiasPorProfessor: string[] = [];
  materiaSelecionada: string = '';
  
  public resgiterForm!: FormGroup;
  public courseList: CourseModelResponse[] = []
  public classList: ClassModel[] = []
  public roomList: RoomsModel[] = []
  public teacherList: RegisterUserResponse[] = [];
  public selectionCourse = new SelectionModel<string>(true, []);
  public selectionClass = new SelectionModel<string>(true, []);
  public errorMessage = {invalid: false, message: ''}

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private roomService: RoomService,
    private classService: ClassService,
    private courseService: CourseService,
    private reloadService: ReloadService,
    private snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.resgiterForm = this.fb.group(
      {
        course_id: ['', [Validators.required]],
        teacher_id: ['', [Validators.required]],
        class_id: ['', [Validators.required]],
        room_id: ['', [Validators.required]],
        start_hour: ['', [Validators.required]],
        end_hour: ['', [Validators.required]],
        date: ['', []],
        start_date: ['', []],
        end_date: ['', []],
      }, { validator: this.dateRangeValidator() }
    );
    this.courseService.getAllCourses().subscribe({
      next: cursos => {
        this.courseList = cursos;
        if(cursos.length == 0){
          this.errorMessage.message = 'Não foram encontrados cursos cadastrados.'
          this.errorMessage.invalid = true;
        }
      },
      error: err => {
        this.errorMessage.message = 'Não foi possível buscar os cursos.'
        this.errorMessage.invalid = true;
      }
    });
    
    this.roomService.getRoomsByInst().subscribe({
      next: (salas) => {
        this.roomList = salas
        if(salas.length == 0){
          this.errorMessage.message = 'Não foram encontradas salas cadastradas.'
          this.errorMessage.invalid = true;
        }
      },
      error: err => {
        this.errorMessage.message = 'Não foi possível buscar as salas.'
        this.errorMessage.invalid = true;
      }
    });  
  }

   private dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.get('start_date')?.value;
      const endDate = control.get('end_date')?.value;
      const rangeDate = control.get('date')?.value;
  
      if ((startDate && endDate) || rangeDate) {
        return null; // Válido se start_date e end_date estiverem preenchidos, ou range_date estiver preenchido
      }
      return { dateRangeInvalid: true }; // Inválido se nenhuma das condições for atendida
    };
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
      this.showPickers = true; // Mostra os pickers se não houver erro
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  
  private isBetweenTimes(date: Date, startTime: string, endTime: string): boolean {
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

  processarMateriasPorProfessor() {
      const uniqueClassSet = new Set<string>();

      this.professores.forEach(professor => {
          const materiasDoProfessor = this.materia.filter(materia => materia.id.includes(professor.id));
          materiasDoProfessor.forEach(materia => {
              uniqueClassSet.add(materia.class); // Corrigido para 'class' ao invés de 'name'
          });
      });

      this.materiasPorProfessor = Array.from(uniqueClassSet);

      console.log(this.professores);
      console.log(this.materia);
  } 

  public saveDate() {
    const formValue = this.resgiterForm.value;
    const formattedData = this.formatDatesAndHours(formValue);
    console.log('Form Submitted!', formattedData);
    const reserve = new ReserveModel({
      class_id: formattedData.class_id,
      room_id: formattedData.room_id,
      user_id: formattedData.teacher_id,
      start_time: formattedData.start_time,
      end_time: formattedData.end_time,
      _id: ''
    });
    this.loaderService.showLoader();
    this.reservationService.createReservation(reserve).subscribe({
      next: res => {
        
        this.snackBar.open('Reserva realizada com sucesso.', '', {
          duration: 4000,
        });
        this.loaderService.hideLoader();
        this.reloadService.reoladPage(['tela-novas-reservas']);
      },
      error: err => {
        this.loaderService.hideLoader();
        this.snackBar.open('Ocorreu um erro durante sua solicitação, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-novas-reservas']);
      }
    })
  }

  formatDatesAndHours(formValue: any): any {
    const { date, start_date, end_date, start_hour, end_hour } = formValue;

    if (date) {
      formValue.start_date = this.combineDateAndTime(date, start_hour);
      formValue.end_date = this.combineDateAndTime(date, end_hour);
    } else {
      if (start_date && start_hour) {
        formValue.start_date = this.combineDateAndTime(start_date, start_hour);
      }

      if (end_date && end_hour) {
        formValue.end_date = this.combineDateAndTime(end_date, end_hour);
      }
    }

    return formValue;
  }

  combineDateAndTime(date: string, time: string): string {
    const [hour, minute] = time.split(':');
    const dateTime = new Date(date);
    dateTime.setUTCHours(parseInt(hour, 10));
    dateTime.setUTCMinutes(parseInt(minute, 10));
    return dateTime.toISOString();
  }

  changeCourse(event: any){
    this.selectionCourse.clear();
    this.selectionCourse.toggle(event);
    this.loaderService.showLoader();
    this.classService.getClassByCourse(this.selectionCourse.selected[0]).subscribe({
      next: res => {
        this.classList = res;
        this.loaderService.hideLoader();
      },
      error: err => {
        this.loaderService.hideLoader();
        this.snackBar.open('Ocorreu um erro durante a busca por matérias, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-novas-reservas']);
      }
    });
  }
  
  changeClass(event: any){
    this.selectionClass.clear();
    this.selectionClass.toggle(event);
    this.classService.getTeacherByClass(this.selectionClass.selected[0]).subscribe({
      next: res => {
        this.teacherList = res;
      },
      error: err => {
        this.snackBar.open('Ocorreu um erro durante a busca por matérias, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-novas-reservas']);
      }
    });
  }
}
