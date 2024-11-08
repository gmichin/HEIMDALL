import { ReservationService } from 'src/app/services/reservation.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from '../tela-reservas.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { SessionService } from 'src/app/services/session.service';
import { ProfessorModel } from 'src/app/models/professor.model';
import { AlunoModel } from 'src/app/models/aluno.model';

interface Sala {
  numero: number;
  professor: string;
  materia: string;
  dia: Date;
}
@Component({
  selector: 'app-tela-permissao-reservas',
  templateUrl: './tela-permissao-reservas.component.html',
  styleUrl: './tela-permissao-reservas.component.scss',
})
export class TelaPermissaoReservasComponent {
  requests: any[] = [];
  displayedColumns: string[] = [
    'accept',
    'numero',
    'professor',
    'materia',
    'dia',
    'remove',
  ];
  dataSource = new MatTableDataSource<Sala>(this.requests);
  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public idProfessorAdm = this.dataProfessorAdm.professor_id;
  public idAluno = this.dataAluno.aluno_id;
  public tipoUsuario = '';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sessionService: SessionService,
    private reservationService: ReservationService
  ) {
    this.reservationService
      .carregarDadosSalasReservadas()
      .subscribe((salas) => {
        this.requests = salas;
        this.dataSource.data = this.requests;
      });

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

  acceptRow(sala: Sala) {
    const index = this.requests.findIndex((item) => item === sala);

    if (index !== -1) {
      this.requests.splice(index, 1);
      this.dataSource.data = [...this.requests];
    }

    const acceptedData = [
      {
        numero: sala.numero,
        professor: sala.professor,
        materia: sala.materia,
        dia: sala.dia.toString(),
      },
    ];

    console.log(acceptedData);
  }

  removeRow(sala: Sala) {
    const index = this.requests.findIndex((item) => item === sala);

    if (index !== -1) {
      this.requests.splice(index, 1);
      this.dataSource.data = [...this.requests];
    }
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
