import { SalaDataService } from 'src/app/services/sala-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaPerfilComponent } from '../tela-perfil/tela-perfil.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ResgistrationRequestsService } from '../services/resgistration-requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlunoModel } from '../models/aluno.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-solicitacoes-registro',
  templateUrl: './tela-solicitacoes-registro.component.html',
  styleUrls: ['./tela-solicitacoes-registro.component.scss'],
})
export class TelaSolicitacoesRegistroComponent implements OnInit {
  displayedColumns: string[] = [
    'APROVE',
    'REJEITE',
    'registro',
    'nome',
    'email',
  ];

  dataSource: MatTableDataSource<AlunoModel> =
    new MatTableDataSource<AlunoModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectionAprove = new SelectionModel<AlunoModel>(true, []);
  selectionReject = new SelectionModel<AlunoModel>(true, []);

  constructor(
    public dialog: MatDialog,
    private readonly _registrationService: ResgistrationRequestsService,
    private snackBar: MatSnackBar,
    private salaDataService: SalaDataService,
    private router: Router
  ) {
    this.salaDataService.carregarDadosAlunos().subscribe(
      (dataAlunos: AlunoModel[]) => {
        this.dataSource = new MatTableDataSource<AlunoModel>(dataAlunos);
      },
      (error) => {
        console.error('Erro ao carregar dados dos alunos:', error);
      }
    );
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
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
      request.status = true;
    });
    this.selectionReject.selected.forEach((request) => {
      request.status = false;
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

  validateAllSelected(selection: SelectionModel<AlunoModel>) {
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
    this.router.navigate(['/home-adm']);
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
