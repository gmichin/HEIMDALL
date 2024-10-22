import { UserData } from './../tela-solicitacoes-registro/tela-solicitacoes-registro.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CursoModel } from '../models/curso.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../services/session.service';
import { TelaPerfilComponent } from '../tela-perfil/tela-perfil.component';
import { ProfessorModel } from '../models/professor.model';
@Component({
  selector: 'app-tela-see-more',
  templateUrl: './tela-see-more.component.html',
  styleUrls: ['./tela-see-more.component.scss'],
})
export class TelaSeeMoreComponent implements OnInit {
  displayedColumns: string[] = [
    'APROVE',
    'REJECT',
    'registrationNumber',
    'nome',
    'email',
  ];
  dataSource!: MatTableDataSource<CursoModel | ProfessorModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectionAprove = new SelectionModel<CursoModel | ProfessorModel>(true, []);
  selectionReject = new SelectionModel<CursoModel | ProfessorModel>(true, []);

  public dataUser = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public id = this.dataUser.professor_id;
  public tipoUsuario = '';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
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
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state && state['data']) {
      const items: (CursoModel | ProfessorModel)[] = state['data'];
      if (items.length > 0) {
        this.dataSource = new MatTableDataSource(items);
      }
    }
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

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }

  validateAllSelected(selection: SelectionModel<CursoModel | ProfessorModel>) {
    if (!this.dataSource || !this.dataSource.data) {
      return false;
    }

    const numSelected = selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllAproveSelected() {
    return this.selectionAprove.selected.length > 0;
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }

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
  enviarLista() {}
}
