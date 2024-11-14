import { TurmaService } from './../../services/turma.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { AlunoModel } from 'src/app/models/aluno.model';
import {
  IProfessoresByDisciplina,
  ProfessorModel,
} from 'src/app/models/professor.model';
import { CursoService } from 'src/app/services/curso.service';
import { CursoModel } from 'src/app/models/curso.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservation.service';
import { SalaModel } from 'src/app/models/sala.model';
import { SalaService } from 'src/app/services/sala.service';

interface HorarioFormatado {
  dataFormatada: string;
  horaInicio: string;
  horaFinal: string;
  originalDate: Date;
}
@Component({
  selector: 'app-tela-permissao-reservas',
  templateUrl: './tela-permissao-reservas.component.html',
  styleUrl: './tela-permissao-reservas.component.scss',
})
export class TelaPermissaoReservasComponent implements OnInit {
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );

  public searchForm!: FormGroup;
  public cursoList: CursoModel[] = [];
  public disciplinaList: DisciplinaModel[] = [];
  public teacherList: IProfessoresByDisciplina = { turmas: [] };
  public salaList: SalaModel[] = [];
  public reservas!: any;
  public errorMessage = { invalid: false, message: '' };
  public hours!: string[];

  public tipoUsuario = '';

  public resultadoEncontrado: boolean = false;
  public reservaIds: string = '';
  public turmaAchada: any;
  public disciplinaAchada: any;

  public horariosString!: string[];
  private horariosFormatados: HorarioFormatado[] = [];
  public proximosHorarios: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly sessionService: SessionService,
    private readonly cursoService: CursoService,
    private readonly reservationService: ReservationService,
    private readonly disciplinaService: DisciplinaService,
    private readonly turmaService: TurmaService,
    private readonly salaService: SalaService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    if (this.dataProfessorAdm.adm == true) {
      this.tipoUsuario = 'Administrador';
    } else if (this.dataProfessorAdm.adm == false) {
      this.tipoUsuario = 'Professor';
    } else if (this.dataAluno.nome) this.tipoUsuario = 'Aluno';
  }

  get horariosFormatadosVisiveis(): HorarioFormatado[] {
    return this.horariosFormatados;
  }

  ngOnInit(): void {
    this.createForm();
    this.getCursos();
  }

  createForm(): void {
    this.searchForm = this.fb.group({
      curso: [null],
      disciplina: [null],
      sala: [null],
      data: [null],
      professor: [null],
      turma_id: [null, [Validators.required]],
    });
  }

  getCursos(): void {
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
        this.snackBar.open(
          'Ocorreu um erro durante a busca por Cursos, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 4000,
          }
        );
        this.router.navigate(['tela-reservas-feitas']);
      },
    });
  }

  private formatarHorarios(): void {
    if (Array.isArray(this.reservas)) {
      this.horariosFormatados = [];

      this.reservas.forEach((reserva: any) => {
        if (
          Array.isArray(reserva.dias_reservados) &&
          reserva.hora_inicio &&
          reserva.hora_final
        ) {
          reserva.dias_reservados.forEach((dia: string) => {
            // Criando a data de forma que ela seja corretamente interpretada no horário local
            const data = new Date(dia + 'T00:00:00'); // Forçando a hora a ser 00:00 para evitar ajustes automáticos

            if (isNaN(data.getTime())) {
              console.error(`Data inválida: ${dia}`);
              return;
            }

            const dataFormatada = `${data
              .getDate()
              .toString()
              .padStart(2, '0')}/${(data.getMonth() + 1)
              .toString()
              .padStart(2, '0')}/${data.getFullYear()}`;

            const horaInicio = this.formatarHora(reserva.hora_inicio);
            const horaFinal = this.formatarHora(reserva.hora_final);

            const horarioFormatado = {
              dataFormatada,
              horaInicio,
              horaFinal,
              originalDate: data,
            };

            this.horariosFormatados.push(horarioFormatado);
          });
        } else {
          console.error(
            'Erro: dias_reservados, hora_inicio ou hora_final não encontrados para a reserva',
            reserva
          );
        }
      });

      this.horariosFormatados.sort(
        (a, b) => a.originalDate.getTime() - b.originalDate.getTime()
      );

      this.horariosString = this.horariosFormatados.map((item) => {
        return `${item.dataFormatada} - ${item.horaInicio} às ${item.horaFinal}`;
      });
    } else {
      console.error('Erro: "this.reservas" não é um array válido');
    }
  }

  private formatarHora(hora: string): string {
    const [horaParte, minutoParte] = hora.split(':');
    return `${horaParte.padStart(2, '0')}:${minutoParte.padStart(2, '0')}`;
  }

  private converterParaDatas(horarioStr: string): Date[] {
    const regex =
      /(\d{2})\/(\d{2})\/(\d{4}) - (\d{2}):(\d{2}) às (\d{2}):(\d{2})/;
    const match = horarioStr.match(regex);

    if (!match) {
      throw new Error('Formato de string inválido');
    }

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10) - 1;
    const ano = parseInt(match[3], 10);
    const horaInicio = parseInt(match[4], 10);
    const minutoInicio = parseInt(match[5], 10);
    const horaFinal = parseInt(match[6], 10);
    const minutoFinal = parseInt(match[7], 10);

    const dataInicio = new Date(ano, mes, dia, horaInicio, minutoInicio);
    const dataFinal = new Date(ano, mes, dia, horaFinal, minutoFinal);

    return [dataInicio, dataFinal];
  }

  public search(): void {
    this.reservationService.findFilter(this.searchForm.value).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.reservas = res;
          this.reservaIds = res.map((r) => r.reserva_id).join('-');
          this.formatarHorarios();
          this.resultadoEncontrado = true;

          const turmaId = this.reservas[0]?.turma?.turma_id;
          if (turmaId) {
            this.buscarTurmaDisciplina(turmaId);

            const horarioAtual = new Date();

            this.proximosHorarios = this.horariosString
              .map((it) => this.converterParaDatas(it))
              .filter(
                ([inicio, fim]) => inicio > horarioAtual && fim > horarioAtual
              )
              .map(
                ([inicio, fim]) =>
                  `${inicio.toLocaleDateString(
                    'pt-BR'
                  )} - ${inicio.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })} às ${fim.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`
              );

            console.log(this.proximosHorarios);
          }
        } else {
          this.resultadoEncontrado = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.resultadoEncontrado = false;
      },
    });
  }

  private buscarTurmaDisciplina(turmaId: number): void {
    this.turmaService.getAllTurmas().subscribe((turmas: any[]) => {
      this.turmaAchada = turmas.find((turma) => turma.turma_id === turmaId);

      if (this.turmaAchada) {
        const disciplinaId = this.turmaAchada.disciplina.disciplina_id;
        this.disciplinaService
          .getAllDisciplinas()
          .subscribe((disciplinas: any[]) => {
            this.disciplinaAchada = disciplinas.find(
              (disciplina) => disciplina.disciplina_id === disciplinaId
            );
          });
      }
    });
  }

  changeCourse(event: any) {
    this.disciplinaList = [];
    this.teacherList = {
      turmas: [],
    };
    this.searchForm.controls['disciplina'].setValue(null);
    this.searchForm.controls['professor'].setValue(null);
    this.searchForm.controls['turma_id'].setValue(null);
    this.searchForm.controls['curso'].setValue(event);
    this.disciplinaService
      .getDisciplinaPorCurso(this.searchForm.controls['curso'].value)
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
          this.router.navigate(['tela-reservas-feitas']);
        },
      });
  }

  changeDisciplina(event: any) {
    this.teacherList = {
      turmas: [],
    };
    this.searchForm.controls['professor'].setValue(null);
    this.searchForm.controls['disciplina'].setValue(event);
    this.disciplinaService
      .getProfessorPorDisciplina(this.searchForm.controls['disciplina'].value)
      .subscribe({
        next: (res) => {
          this.teacherList = res;
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a busca por professores, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['tela-reservas-feitas']);
        },
      });
  }

  changeProfessor(event: any) {
    this.searchForm.controls['turma_id'].setValue(event);
    this.teacherList.turmas.forEach((it) => {
      if (it.turma_id == event) {
        this.searchForm.controls['professor'].setValue(it.professor);
      }
    });
    this.reservationService
      .findSalaFilter(
        this.searchForm.controls['professor'].value,
        this.searchForm.controls['turma_id'].value
      )
      .subscribe({
        next: (res) => {
          this.salaList = res.map((item) => item.sala);
        },
        error: (err) => {
          console.log(err);
        },
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

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }
  public getUniqueSalas(): SalaModel[] {
    const uniqueSalas = this.salaList.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.ident_sala === value.ident_sala)
    );
    return uniqueSalas;
  }
}
