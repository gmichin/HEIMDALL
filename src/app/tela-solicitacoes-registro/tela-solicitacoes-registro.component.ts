import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaPerfilComponent } from '../tela-perfil/tela-perfil.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ResgistrationRequestsService } from '../services/resgistration-requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { ProfessorModel } from '../models/professor.model';

@Component({
  selector: 'app-tela-solicitacoes-registro',
  templateUrl: './tela-solicitacoes-registro.component.html',
  styleUrls: ['./tela-solicitacoes-registro.component.scss'],
})
export class TelaSolicitacoesRegistroComponent implements OnInit {
  displayedColumns: string[] = [
    'APROVE',
    'REJEITE',
    'registrationNumber',
    'nome',
    'email',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectionAprove = new SelectionModel<ProfessorModel>(true, []);
  selectionReject = new SelectionModel<ProfessorModel>(true, []);

  public dataUser = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public id = this.dataUser.professor_id;
  public tipoUsuario = '';

  constructor(
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private readonly _registrationService: ResgistrationRequestsService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
    private router: Router
  ) {
    switch (this.dataUser.adm) {
      case true:
        this.tipoUsuario = 'Administrador';
        break;
      case false:
        this.tipoUsuario = 'Professor';
        break;
    }
    const users: ProfessorModel[] = this._activatedRoute.snapshot.data['dados'];
    if (users.length > 0) {
      this.dataSource = new MatTableDataSource(users);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {}

  public enviarLista() {
    this.selectionAprove.selected.forEach((request) => {
      request.adm = true;
    });
    this.selectionReject.selected.forEach((request) => {
      request.adm = false;
    });

    this._registrationService
      .sendResquestResponse([
        ...this.selectionAprove.selected,
        ...this.selectionReject.selected,
      ])
      .subscribe({
        next: (res) => {
          this.snackBar.open(`Respostas enviadas com sucesso`, '', {
            duration: 5000,
          });
          this.router.navigate(['tela-solicitacoes-registro']);
        },
        error: (err) => {
          this.snackBar.open(`Ocorreu um erro durante sua solicitação.`, '', {
            duration: 2000,
          });
        },
      });
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }

  validateAllSelected(selection: SelectionModel<ProfessorModel>) {
    const numSelected = selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllAproveSelected() {
    return this.selectionAprove.selected.length > 0;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRowsAprove() {
    if (this.isAllAproveSelected()) {
      this.selectionAprove.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selectionReject.isSelected(row)) {
        this.selectionAprove.select(row);
      }
    });
  }
  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selectionAprove.isSelected(row)) {
        this.selectionReject.select(row);
      }
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
}

export interface UserData {
  registrationNumber: string;
  nome: string;
  email: string;
}
