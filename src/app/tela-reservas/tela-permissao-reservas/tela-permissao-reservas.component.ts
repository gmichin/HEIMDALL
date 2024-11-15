import { ReservationService } from './../../services/reservation.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurmaModel } from 'src/app/models/turma.model';
import { IReserva } from 'src/app/models/reserva.model';
@Component({
  selector: 'app-tela-permissao-reservas',
  templateUrl: './tela-permissao-reservas.component.html',
  styleUrl: './tela-permissao-reservas.component.scss',
})
export class TelaPermissaoReservasComponent {
  displayedColumns: string[] = [
    'rejeitar',
    'aprovar',
    'professor',
    'sala',
    'periodo',
    'hora_inicio',
    'hora_final',
    'dias_reservados',
  ];
  dataSource = new MatTableDataSource<IReserva>();
  selectionCourse = new SelectionModel<string>(true, []);
  selection = new SelectionModel<any>(true, []);
  selectionReject = new SelectionModel<any>(true, []);
  public form: FormGroup;

  disciplinasCurso: any[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      professor_id: ['', [Validators.required]],
      sala_id: ['', [Validators.required]],
      turma_id: ['', [Validators.required]],
      dias_reservados: this.fb.array([]),
      hora_inicio: ['', [Validators.required]],
      hora_final: ['', [Validators.required]],
    });

    this.reservationService.carregarDadosSalasReservadas().subscribe({
      next: (reservas) => {
        const reservasFiltradas = reservas.filter(
          (reserva) => reserva.status == false
        );
        this.dataSource.data = reservasFiltradas;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatTable)
  table!: MatTable<DisciplinaModel>;

  aprovarReserva() {
    this.selection.selected.forEach((request) => {
      const reservaFormatada = {
        reserva_id: request.reserva_id,
        professor: request.professor.professor_id,
        sala: request.sala.sala_id,
        turma: request.turma.turma_id,
        status: true,
        dataInicio: request.dias_reservados[0],
        dataFim: request.dias_reservados[request.dias_reservados.length - 1],
        hora_inicio: request.hora_inicio,
        hora_final: request.hora_final,
      };
      this.reservationService.atualizarReservas(reservaFormatada).subscribe({
        next: (res) => {
          this.snackBar.open('Atualizado com sucesso!', '', {
            duration: 4000,
          });
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['home-adm']);
            });
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a atualização, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['home-adm']);
            });
        },
      });
    });
  }

  apagarReservas() {
    this,
      this.selectionReject.selected.forEach((request) => {
        this.reservationService.apagarReservas(request).subscribe({
          next: (res) => {
            this.snackBar.open('Removida(s) com sucesso!', '', {
              duration: 4000,
            });
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['home-adm']);
              });
          },
          error: (err) => {
            this.snackBar.open(
              'Ocorreu um erro durante a solicitação, por favor, tente novamente mais tarde.',
              '',
              {
                duration: 4000,
              }
            );
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['home-adm']);
              });
          },
        });
      });
  }

  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selectionReject.isSelected(row)) {
        this.selectionReject.select(row);
        // Desmarcar aprovar se rejeitar for selecionado
        this.selection.deselect(row);
      }
    });
  }

  toggleAllRowsApprove() {
    if (this.isAllApproveSelected()) {
      this.selection.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selection.isSelected(row)) {
        this.selection.select(row);
        // Desmarcar rejeitar se aprovar for selecionado
        this.selectionReject.deselect(row);
      }
    });
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length === this.dataSource.data.length;
  }

  isAllApproveSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }
}
