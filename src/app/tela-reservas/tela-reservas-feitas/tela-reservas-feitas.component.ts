import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { AlunoModel } from 'src/app/models/aluno.model';
import { ProfessorModel } from 'src/app/models/professor.model';
import { CursoService } from 'src/app/services/curso.service';
import { CursoModel } from 'src/app/models/curso.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservation.service';
import { IConsultaReserva, IReserva } from 'src/app/models/reserva.model';

@Component({
  selector: 'app-tela-reservas-feitas',
  templateUrl: './tela-reservas-feitas.component.html',
  styleUrls: ['./tela-reservas-feitas.component.scss'],
})
export class TelaReservasFeitasComponent implements OnInit {
  
  public searchForm!: FormGroup;
  public cursoList: CursoModel[] = [];
  public disciplinaList: DisciplinaModel[] = [];
  public teacherList: ProfessorModel[] = [];
  public reservas!: IConsultaReserva;
  public errorMessage = { invalid: false, message: '' };
  public hours!: string[];

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly sessionService: SessionService,
    private readonly cursoService: CursoService,
    private readonly reservationService: ReservationService,
    private readonly disciplinaService: DisciplinaService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    
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
      turma_id: [null, [Validators.required]]
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

  public search(): void {
    this.reservationService.findFilter(this.searchForm.value).subscribe({
      next: (res) => {
        this.reservas = res[0];
        this.hours = this.gerarHorarios(res[0].hora_inicio, res[0].hora_final);
      },
      error: (err) => console.log(err)
    })
  }

  private gerarHorarios(inicio: string, fim: string) {
    const horarios = [];
    let horarioAtual = new Date(`1970-01-01T${inicio}Z`);
    const horarioFim = new Date(`1970-01-01T${fim}Z`);
  
    while (horarioAtual <= horarioFim) {
      horarios.push(horarioAtual.toISOString().substring(11, 19));
      horarioAtual.setHours(horarioAtual.getHours() + 1);
    }
  
    return horarios;
  }

  changeCourse(event: any) {
    this.disciplinaList = [];
    this.teacherList = [];
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

  changeClass(event: any) {
    this.teacherList = [];
    this.searchForm.controls['professor'].setValue(null);
    this.searchForm.controls['turma_id'].setValue(null);
    this.searchForm.controls['disciplina'].setValue(event);
    this.disciplinaService
      .getProfessorPorDisciplina(this.searchForm.controls['disciplina'].value)
      .subscribe({
        next: (res) => {
          this.teacherList = res.professores;
          this.searchForm.controls['turma_id'].setValue(res.turma_id);
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

  goBack() {
    this.router.navigate(['/home-adm']);
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
