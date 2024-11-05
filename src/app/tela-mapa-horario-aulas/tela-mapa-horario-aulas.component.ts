import { ProfessorService } from './../services/professor.service';
import { SalaService } from 'src/app/services/sala.service';
import { Component, OnInit } from '@angular/core';
import { SessionService } from './../services/session.service';
import { SalaDataService } from '../services/sala-data.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaReservasComponent } from '../tela-reservas/tela-reservas.component';
import { ProfessorModel } from '../models/professor.model';
import { AlunoModel } from '../models/aluno.model';
import { TurmaModel } from '../models/turma.model';
import { SalaModel } from '../models/sala.model';
import { DisciplinaModel } from '../models/disciplina.model';
import { CursoModel } from '../models/curso.model';
import { IReserva } from '../models/reserva.model';

interface CronogramaModel {
  professor_id: number;
  data: Date;
  turma_id: number;
  sala_id: number;
}

@Component({
  selector: 'app-tela-mapa-horario-aulas',
  templateUrl: './tela-mapa-horario-aulas.component.html',
  styleUrls: ['./tela-mapa-horario-aulas.component.scss'],
})
export class TelaMapaHorarioAulasComponent implements OnInit {
  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public idProfessorAdm = this.dataProfessorAdm.professor_id;
  public idAluno = this.dataAluno.aluno_id;
  public usuarioReservas: IReserva[] = [];
  public cronograma: CronogramaModel[] = [];
  public exceptions: any[] = [];
  public tipoUsuario = '';

  public turmas: TurmaModel[] = [];
  public salas: SalaModel[] = [];
  public professores: ProfessorModel[] = [];
  public reservas: IReserva[] = [];
  public disciplinas: DisciplinaModel[] = [];
  public cursos: CursoModel[] = [];

  public tabelaHoras: string[] = Array.from(
    { length: 17 },
    (_, i) => (i + 6 < 10 ? '0' : '') + (i + 6).toString()
  );
  public diasSemana: string[] = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  constructor(
    private sessionService: SessionService,
    private salaDataService: SalaDataService,
    private salaService: SalaService,
    private professorService: ProfessorService,
    private router: Router,
    public dialog: MatDialog
  ) {
    switch (this.dataProfessorAdm.adm) {
      case true:
        this.tipoUsuario = 'Administrador';
        break;
      case false:
        this.tipoUsuario = 'Professor';
        break;
    }
    if (this.dataAluno) this.tipoUsuario = 'Aluno';
  }

  ngOnInit() {
    forkJoin({
      reservas: this.salaDataService.carregarDadosSalasReservadas(),
      turma: this.salaDataService.carregarDadosTurma(),
      salas: this.salaService.carregarDadosSalas(),
      professor: this.professorService.getAllProfessores(),
    }).subscribe(({ reservas, turma, salas, professor }) => {
      this.reservas = reservas;
      this.turmas = turma;
      this.salas = salas;
      this.professores = professor;
      this.filterUsuarioReservas();
    });
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
  filterUsuarioReservas() {
    this.usuarioReservas = this.reservas.filter(
      (reservas) => reservas.professor_id === this.idProfessorAdm
    );
    this.processarReservas();
  }

  processarReservas() {}

  getMonthIndex(month: string): number {
    const monthNames = [
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
    return monthNames.indexOf(month);
  }

  getReservas(day: string, hour: number): string {
    const reservas = this.cronograma.find((slot) => {
      const date = slot.data;
      return (
        date.getHours() === hour && this.diasSemana[date.getDay() - 1] === day
      );
    });
    if (reservas) {
      const sala = this.salas.find((sala) => sala.sala_id === reservas.sala_id);
      const professor = this.professores.find(
        (professor) => professor.professor_id === reservas.professor_id
      );
      const turma = this.turmas.find(
        (turma) => turma.professor_id === reservas.professor_id
      );
      const disciplina = turma
        ? this.disciplinas.find(
            (disciplina) => disciplina.disciplina_id === turma.turma_id
          )
        : null;

      const salaNome = sala?.ident_sala || 'N/A';
      const professorNome = professor?.nome || 'N/A';
      const turmaNome = turma?.periodo || 'N/A';
      const turmaId = turma?.turma_id || 'N/A';
      const disciplinaNome = disciplina?.nome || 'N/A';
      const disciplinaId = disciplina?.disciplina_id || 'N/A';

      return `${disciplinaNome} - ${turmaNome}\nProfessor: ${professorNome}\nNome da Sala: ${salaNome}`;
    }
    return '';
  }

  temReservas(day: string, hour: number): boolean {
    return this.cronograma.some((slot) => {
      const date = slot.data;
      return (
        date.getHours() === hour && this.diasSemana[date.getDay() - 1] === day
      );
    });
  }

  public redirectReserve() {
    const dialogT = this.dialog.open(TelaReservasComponent, {
      width: '400px',
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

  private dialogCloseSubs() {
    this.router.navigate(['reload']);
  }
}
