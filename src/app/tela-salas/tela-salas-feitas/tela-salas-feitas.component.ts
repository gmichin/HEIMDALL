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
    'remove',
    'edit',
    'numero',
    'cadeiras',
    'mesas',
    'cadeirasPorMesa',
    'computadores',
    'lousa',
    'projetor',
    'status',
  ];
  dataSource = new MatTableDataSource<SalaModel>();
  selection = new SelectionModel<SalaModel>(true, []);
  selectionReject = new SelectionModel<SalaModel>(true, []);

  public dataUser = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public id = this.dataUser.professor_id;
  public tipoUsuario = '';

  constructor(
    public dialog: MatDialog,
    private salaService: SalaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private sessionService: SessionService
  ) {
    switch (this.dataUser.adm) {
      case true:
        this.tipoUsuario = 'Administrador';
        break;
      case false:
        this.tipoUsuario = 'Professor';
        break;
    }
    this.salaService.getRoomsByInst().subscribe({
      next: (salas) => {
        this.dataSource.data = salas;
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

  @ViewChild(MatTable)
  table!: MatTable<SalaModel>;

  editSala() {
    this.salaService.saveRoomToEdit(this.selection.selected[0]);
  }

  apagarSalas() {
    this.salaService.deleteRoom(this.selectionReject.selected).subscribe({
      next: (res) => {
        this.snackBar.open('Removida(s) com sucesso!', '', {
          duration: 4000,
        });
        this.router.navigate(['tela-salas-feitas']);
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante a solicitação, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 4000,
          }
        );
        this.router.navigate(['tela-salas-feitas']);
      },
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
      }
    });
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }
}
