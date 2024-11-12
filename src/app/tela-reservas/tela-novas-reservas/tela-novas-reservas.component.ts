import { CursoService } from './../../services/curso.service';
import { SalaModel } from './../../models/sala.model';
import { DisciplinaService } from './../../services/disciplina.service';
import { DisciplinaModel } from './../../models/disciplina.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TelaReservasComponent } from '../tela-reservas.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoModel } from 'src/app/models/curso.model';
import { IReserva } from 'src/app/models/reserva.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { SessionService } from 'src/app/services/session.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { AlunoModel } from 'src/app/models/aluno.model';
import { ProfessorModel } from 'src/app/models/professor.model';
import { SalaService } from 'src/app/services/sala.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-tela-novas-reservas',
  templateUrl: './tela-novas-reservas.component.html',
  styleUrl: './tela-novas-reservas.component.scss',
})
export class TelaNovasReservasComponent implements OnInit {
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

  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public idAluno = this.dataAluno.aluno_id;
  public idProfessorAdm = this.dataProfessorAdm.professor_id;
  public tipoUsuario = '';

  public resgiterForm!: FormGroup;
  public cursoModel: CursoModel[] = [];
  public disciplinaList: DisciplinaModel[] = [];
  public salaList: SalaModel[] = [];
  public teacherList: ProfessorModel[] = [];
  public selectionCourse = new SelectionModel<string>(true, []);
  public selectionClass = new SelectionModel<string>(true, []);
  public errorMessage = { invalid: false, message: '' };
  public cursoList: CursoModel[] = [];

  constructor(
    private sessionService: SessionService,
    public dialog: MatDialog,
    private salaService: SalaService,
    private cursoService: CursoService,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.dataProfessorAdm.adm == true) {
      this.tipoUsuario = 'Administrador';
    } else if (this.dataProfessorAdm.adm == false) {
      this.tipoUsuario = 'Professor';
    } else if (this.dataAluno.nome) this.tipoUsuario = 'Aluno';

    this.resgiterForm = this.fb.group({
      professor_id: [null, [Validators.required]],
      sala_id: ['', [Validators.required]],
      turma_id: ['', [Validators.required]],
      disciplina_id: [null, [Validators.required]],
      status: [false, [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFim: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
    });
    this.cursoService.getAllCursos().subscribe({
      next: (cursos) => {
        this.cursoList = cursos;
        if (cursos.length == 0) {
          this.errorMessage.message =
            'Não foram encontrados cursos cadastrados.';
          this.errorMessage.invalid = true;
        }
      },
      error: (err) => {
        this.errorMessage.message = 'Não foi possível buscar os cursos.';
        this.errorMessage.invalid = true;
      },
    });

    this.salaService.carregarDadosSalas().subscribe({
      next: (salas) => (this.salaList = salas),
      error: (err) => {
        this.errorMessage = {
          invalid: true,
          message: 'Ocorreu um erro durante a busca pelas salas.',
        };
      },
    });
  }

  public redirectHomeAdm() {
    this.router.navigate(['redirecionar']);
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
      this.error =
        'O horário de início deve ser menor que o horário de término';
      this.endTime = '';
      this.showPickers = false;
    } else {
      this.error = '';
      this.showPickers = true;
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  applyDateRange() {
    if (this.startDate && this.endDate) {
      const dateRange = this.getDateRangeArray(this.startDate, this.endDate);

      dateRange.forEach((date) => {
        const selectedStartTime = this.getStartTime();
        const selectedEndTime = this.getEndTime();

        const existingIndex = this.diasSelecionados.findIndex((selectedDate) =>
          this.isSameDay(selectedDate, date)
        );

        if (existingIndex !== -1) {
          this.diasSelecionados.splice(existingIndex, 1);
        } else {
          this.addTimeRangeToSelectedDates(
            date,
            selectedStartTime,
            selectedEndTime
          );
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
      const todayDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const isDisabled = this.diasDesabilitados.some((diaDesabilitado) =>
        this.isSameDay(
          currentDate,
          new Date(
            diaDesabilitado.ano,
            diaDesabilitado.mes - 1,
            diaDesabilitado.dia
          )
        )
      );

      if (
        dayWeek !== 0 &&
        dayWeek !== 6 &&
        currentDate >= todayDay &&
        !isDisabled
      ) {
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

      const existingIndex = this.diasSelecionados.findIndex((date) =>
        selectedDateTimeList.some((dateTime) => this.isSameDay(date, dateTime))
      );

      if (existingIndex === -1) {
        this.diasSelecionados.push(...selectedDateTimeList);
      } else {
        const selectedDateTimeToRemove = selectedDateTimeList.find((dateTime) =>
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
    const todayDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const isDisabled = this.diasDesabilitados.some((diaDesabilitado) =>
      this.isSameDay(date, diaDesabilitado.dia)
    );

    return dayWeek !== 0 && dayWeek !== 6 && date >= todayDay && !isDisabled;
  };
  generateHours(): void {
    for (let i = 5; i < 23; i++) {
      const hour = i < 10 ? '0' + i : '' + i;
      this.hours.push(hour + ':00');
    }
  }

  selectMateria(materia: string) {
    this.materiaSelecionada = materia;
  }

  selectSala(numeroSala: string) {
    this.numeroSalaSelecionada = numeroSala;
  }

  processarMateriasPorProfessor() {
    const uniqueClassSet = new Set<string>();

    this.professores.forEach((professor) => {
      const materiasDoProfessor = this.materia.filter((materia) =>
        materia.id.includes(professor.id)
      );
      materiasDoProfessor.forEach((materia) => {
        uniqueClassSet.add(materia.class);
      });
    });

    this.materiasPorProfessor = Array.from(uniqueClassSet);

    console.log(this.professores);
    console.log(this.materia);
  }

  public saveDate() {
    const dataInicio = new Date(this.resgiterForm.controls['dataInicio'].value)
      .toISOString()
      .split('T')[0];
    const dataFim = new Date(this.resgiterForm.controls['dataFim'].value)
      .toISOString()
      .split('T')[0];

    this.resgiterForm.controls['dataInicio'].setValue(dataInicio);
    this.resgiterForm.controls['dataFim'].setValue(dataFim);

    const reserva: IReserva = this.resgiterForm.value;
    this.reservationService.createReservation(reserva).subscribe({
      next: (res) => {
        this.snackBar.open('Reserva realizada com sucesso.', '', {
          duration: 4000,
        });
        this.router.navigate(['redirecionar']);
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante sua solicitação, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 4000,
          }
        );
        this.router.navigate(['tela-novas-reservas']);
      },
    });
  }

  formatarData(dataString: string) {
    const data = new Date(dataString);

    const dia = ('0' + data.getDate()).slice(-2);
    const mes = this.obterNomeMes(data.getMonth());
    const ano = data.getFullYear();
    const hora = ('0' + data.getHours()).slice(-2);
    const minuto = ('0' + data.getMinutes()).slice(-2);
    const segundo = ('0' + data.getSeconds()).slice(-2);
    const fusoHorario = this.obterFusoHorario(data.getTimezoneOffset());

    return `${dia} ${mes} ${dia} ${ano} ${hora}:${minuto}:${segundo} ${fusoHorario}`;
  }

  obterNomeMes(numeroMes: number) {
    const meses = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return meses[numeroMes];
  }

  obterFusoHorario(offsetMinutos: number) {
    const offsetHoras = offsetMinutos / 60;
    const sinal = offsetHoras >= 0 ? '-' : '+';
    const absOffsetHoras = Math.abs(offsetHoras);
    const horas = ('0' + Math.floor(absOffsetHoras)).slice(-2);
    const minutos = ('0' + (absOffsetHoras % 1) * 60).slice(-2);

    return `${sinal}${horas}:${minutos}`;
  }

  formatDatesAndHours(formValue: any): any {
    formValue.end_date =
      formValue.end_date == '' ? formValue.start_date : formValue.end_date;
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
    return this.formatarData(dateTime.toISOString());
  }

  changeCourse(event: any) {
    this.selectionCourse.clear();
    this.selectionCourse.toggle(event);
    this.disciplinaService
      .getDisciplinaPorCurso(this.selectionCourse.selected[0])
      .subscribe({
        next: (res) => {
          this.disciplinaList = res;
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a busca por matérias, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['tela-novas-reservas']);
        },
      });
  }

  changeClass(event: any) {
    this.selectionClass.clear();
    this.selectionClass.toggle(event);
    this.disciplinaService
      .getProfessorPorDisciplina(this.selectionClass.selected[0])
      .subscribe({
        next: (res) => {
          this.teacherList = res.professores;
          this.resgiterForm.controls['turma_id'].setValue(res.turma_id);
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a busca por professores, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['tela-novas-reservas']);
        },
      });
  }

  validaRole() {
    const user =
      this.sessionService.getSessionData<ProfessorModel>('professor').retorno;
    return user.adm == true;
  }
  goBack() {
    if (this.tipoUsuario == 'Administrador')
      this.router.navigate(['/home-adm']);
    else if (this.tipoUsuario == 'Professor')
      this.router.navigate(['/home-teacher']);
    else if (this.tipoUsuario == 'Aluno')
      this.router.navigate(['/home-student']);
  }

  logout() {
    this.router.navigate(['/']);
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }
}
