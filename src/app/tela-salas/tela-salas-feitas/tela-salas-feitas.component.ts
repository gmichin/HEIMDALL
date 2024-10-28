import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { SelectionModel } from '@angular/cdk/collections';
import { SalaModel } from 'src/app/models/sala.model';
import { SalaService } from 'src/app/services/sala.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaDisciplinasComponent } from 'src/app/tela-disciplinas/tela-disciplinas.component';
import { ProfessorModel } from 'src/app/models/professor.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-tela-salas-feitas',
  templateUrl: './tela-salas-feitas.component.html',
  styleUrls: ['./tela-salas-feitas.component.scss'],
})
export class TelaSalasFeitasComponent {
  displayedColumns: string[] = [
    'status',
    'ident_sala',
    'num_cadeiras',
    'num_mesas',
    'num_projetores',
    'num_computadores',
    'num_lousas',
  ];
  dataSource = new MatTableDataSource<SalaModel>();
  selection = new SelectionModel<SalaModel>(true, []);
  selectionReject = new SelectionModel<SalaModel>(true, []);

  public dataSala = <SalaModel>(
    this.sessionService.getSessionData('sala').retorno
  );
  public id = Number(this.dataSala.sala_id);
  public tipoUsuario = '';

  constructor(
    public dialog: MatDialog,
    private salaDataService: SalaDataService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.salaDataService.carregarDadosSalas().subscribe({
      next: (salas) => {
        this.dataSource.data = salas;
      },
    });
    console.log(this.dataSource.data);
  }

  goBack() {
    this.router.navigate(['/home-adm']);
  }

  logout() {
    this.router.navigate(['/']);
  }

  public redirectMaterias() {
    const dialogT = this.dialog.open(TelaDisciplinasComponent, {
      width: '400px',
    });
  }

  public redirectHomeAdm() {
    this.router.navigate(['redirecionar']);
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
    this.router.navigate(['redirecionar']);
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

  editSala() {
    this.salaDataService.atualizarSala(this.selection.selected[0]);
  }

  apagarSalas() {
    this.salaDataService.deletarSala(this.id);
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
}
