import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaPerfilComponent } from '../tela-perfil/tela-perfil.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterUserResponse, RequestRegistrationUserResponse } from '../models/register.models';
import { ResgistrationRequestsService } from '../services/resgistration-requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReloadService } from '../services/reload.service';
import { RoleId } from 'src/app/models/role.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-tela-solicitacoes-registro',
  templateUrl: './tela-solicitacoes-registro.component.html',
  styleUrls: ['./tela-solicitacoes-registro.component.scss']
})

export class TelaSolicitacoesRegistroComponent implements OnInit {

  displayedColumns: string[] = ['APROVE','REJEITE','registrationNumber', 'nome', 'email'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  selectionAprove = new SelectionModel<RequestRegistrationUserResponse>(true, []);
  selectionReject = new SelectionModel<RequestRegistrationUserResponse>(true, []);
  
  public dataUser = <RegisterUserResponse>this.sessionService.getSessionData('user').retorno;
  public id = this.dataUser._id;
  public role = '';

  constructor(
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private readonly _registrationService: ResgistrationRequestsService,
    private snackBar: MatSnackBar,
    private reload: ReloadService,    
    private sessionService: SessionService,
    private router: Router,
  ) {    
    switch(this.dataUser.role){
    case RoleId.ADM:
      this.role = 'Administrador';
      break;
    case RoleId.PROFESSOR:
      this.role = 'Professor';
      break;
    case RoleId.ALUNO:
      this.role = 'Aluno';
      break;
  }
    const users: RegisterUserResponse[] = this._activatedRoute.snapshot.data['dados'];
    if(users.length > 0) {
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


  ngOnInit() {
  }

  public enviarLista() {

    this.selectionAprove.selected.forEach(request => {
      request.status = 'CONFIRMED';
    });
    this.selectionReject.selected.forEach(request => {
      request.status = 'REJECTED';
    });

    this._registrationService.sendResquestResponse([...this.selectionAprove.selected, ...this.selectionReject.selected]).subscribe({
      next: (res) => {
        this.snackBar.open(`Respostas enviadas com sucesso`, '', {
          duration: 5000,
        });
        this.reload.reoladPage(['tela-solicitacoes-registro'])
      },
      error: (err) => {
        this.snackBar.open(`Ocorreu um erro durante sua solicitação.`, '', {
          duration: 2000,
        });
      },
    })
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }

  public redirectHomeAdm() {
    this.reload.reoladPage(['redirecionar'])
  }

  validateAllSelected(selection: SelectionModel<RequestRegistrationUserResponse>) {
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
    this.dataSource.data.forEach(row => {
      if(!this.selectionReject.isSelected(row)){
        this.selectionAprove.select(row);
      }
    })
  }
  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach(row => {
      if(!this.selectionAprove.isSelected(row)){
        this.selectionReject.select(row);
      }
    })
  }
  goBack(){
    if(this.role=="Administrador") this.router.navigate(['/home-adm']);
    else if(this.role=="Professor") this.router.navigate(['/home-teacher']);
    else if(this.role=="Aluno") this.router.navigate(['/home-student']);
  }
  logout(){
    this.router.navigate(['/']);
  }
}

export interface UserData {
  registrationNumber: string;
  nome: string;
  email: string;
}