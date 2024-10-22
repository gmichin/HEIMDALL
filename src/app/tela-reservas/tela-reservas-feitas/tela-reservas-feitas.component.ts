import { SalaService } from './../../services/sala.service';
import { DisciplinaModel } from './../../models/disciplina.model';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from '../tela-reservas.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { combineLatest, firstValueFrom, forkJoin } from 'rxjs';
import { CursoService } from 'src/app/services/curso.service';
import { CursoModel } from 'src/app/models/curso.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservaModel } from 'src/app/models/reserva.model';
import { SessionService } from 'src/app/services/session.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { SalaModel } from 'src/app/models/sala.model';
import { ProfessorModel } from 'src/app/models/professor.model';
import { AlunoModel } from 'src/app/models/aluno.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-tela-reservas-feitas',
  templateUrl: './tela-reservas-feitas.component.html',
  styleUrls: ['./tela-reservas-feitas.component.scss'],
})
export class TelaReservasFeitasComponent {
  salas: SalaModel[] = [];
  displayedColumns: string[] = [
    'remove',
    'numero',
    'professor',
    'start_time',
    'end_time',
  ];
  idSalaReservada: any[] = [];
  salasFiltradas: any[] = [];
  numeroSala: any[] = [];
  professores: any[] = [];
  classes: any[] = [];

  public courseList: CursoModel[] = [];
  public classList: DisciplinaModel[] = [];
  public reserveList: ReservaModel[] = [];
  dataSource = new MatTableDataSource<ReservaModel>();
  selectionReject = new SelectionModel<ReservaModel>(true, []);

  public selectionCourse = new SelectionModel<string>(true, []);
  public selectionClass = new SelectionModel<string>(true, []);
  public resgiterForm!: FormGroup;

  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public idAluno = this.dataAluno.aluno_id;
  public idProfessorAdm = this.dataProfessorAdm.professor_id;
  public tipoUsuario = '';

  constructor(
    private reservationService: ReservationService,
    public dialog: MatDialog,
    private router: Router,
    private cursoService: CursoService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private disciplinaService: DisciplinaService,
    private fb: FormBuilder
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
    this.resgiterForm = this.fb.group({
      curso_id: ['', [Validators.required]],
      sala_id: ['', [Validators.required]],
    });
    this.cursoService.getAllCursos().subscribe({
      next: (cursos) => {
        this.courseList = cursos;
        // if(cursos.length == 0){
        //   this.errorMessage.message = 'Não foram encontrados cursos cadastrados.'
        //   this.errorMessage.invalid = true;
        // }
      },
      error: (err) => {
        // this.errorMessage.message = 'Não foi possível buscar os cursos.'
        // this.errorMessage.invalid = true;
      },
    });
  }

  changeCourse(event: any) {
    this.selectionCourse.clear();
    this.selectionCourse.toggle(event);
    this.disciplinaService
      .getDisciplinaPorCurso(this.selectionCourse.selected[0])
      .subscribe({
        next: (res) => {
          this.classList = res;
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
    this.selectionClass.clear();
    this.selectionClass.toggle(event);
  }

  public redirectHomeAdm() {
    this.router.navigate(['redirecionar']);
  }

  search() {
    this.reservationService
      .findByClass(this.selectionClass.selected[0])
      .subscribe({
        next: (res) => {
          this.dataSource.data = res;
          if (res.length == 0) {
            this.snackBar.open(
              'Não foram encontradas reservas para sua busca.',
              '',
              {
                duration: 4000,
              }
            );
            this.router.navigate(['tela-reservas-feitas']);
          }
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a busca por reservas, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['tela-reservas-feitas']);
        },
      });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatTable)
  table!: MatTable<SalaModel>;

  addData() {
    this.router.navigate(['/tela-novas-reservas']);
  }

  removeData() {
    this.reservationService
      .deleteReserve(this.selectionReject.selected)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Removida(s) com sucesso!', '', {
            duration: 4000,
          });
          this.router.navigate(['tela-reservas-feitas']);
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a solicitação, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['tela-reservas-feitas']);
        },
      });
  }

  validaRole() {
    const user =
      this.sessionService.getSessionData<ProfessorModel>('professor').retorno;
    return user.adm == true;
  }

  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selectionReject.isSelected(row)) {
        this.selectionReject.select(row);
      }
    });
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
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
