import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CourseModelResponse } from '../models/course.model';
import { RegisterUserResponse, RequestRegistrationUserResponse } from '../models/register.models';
import { ResgistrationRequestsService } from '../services/resgistration-requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReloadService } from '../services/reload.service';
import { SessionService } from '../services/session.service';
import { TelaPerfilComponent } from '../tela-perfil/tela-perfil.component';

@Component({
  selector: 'app-tela-see-more',
  templateUrl: './tela-see-more.component.html',
  styleUrls: ['./tela-see-more.component.scss']
})
export class TelaSeeMoreComponent implements OnInit {

  displayedColumns: string[] = ['APROVE', 'REJECT', 'registrationNumber', 'nome', 'email'];
  dataSource!: MatTableDataSource<CourseModelResponse | RegisterUserResponse>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectionAprove = new SelectionModel<CourseModelResponse | RegisterUserResponse>(true, []);
  selectionReject = new SelectionModel<CourseModelResponse | RegisterUserResponse>(true, []);

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private readonly registrationService: ResgistrationRequestsService,
    private snackBar: MatSnackBar,
    private reload: ReloadService,
    private sessionService: SessionService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: (CourseModelResponse | RegisterUserResponse)[] };
    const items: (CourseModelResponse | RegisterUserResponse)[] = state.data;
    if(items.length > 0) {
      this.dataSource = new MatTableDataSource(items);
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

  private mapToRequestRegistrationUserResponse(item: RegisterUserResponse): RequestRegistrationUserResponse {
    return {
      ...item,
      Instituition_id: this.getInstitutionId(),
      role: { _id: item.role }, // Alteração aqui
    };
  }

  private getInstitutionId(): string {
    return this.sessionService.getSessionData<string>('idInstitution').retorno;
  }

  public enviarLista() {
    const requestsAprove = this.selectionAprove.selected
      .filter((request): request is RegisterUserResponse => 'Instituition_id' in request)
      .map(this.mapToRequestRegistrationUserResponse.bind(this));

    const requestsReject = this.selectionReject.selected
      .filter((request): request is RegisterUserResponse => 'Instituition_id' in request)
      .map(this.mapToRequestRegistrationUserResponse.bind(this));

    this.registrationService.sendResquestResponse([...requestsAprove, ...requestsReject]).subscribe({
      next: () => {
        this.snackBar.open(`Respostas enviadas com sucesso`, '', {
          duration: 5000,
        });
        this.reload.reoladPage(['tela-see-more']);
      },
      error: () => {
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

  validateAllSelected(selection: SelectionModel<CourseModelResponse | RegisterUserResponse>) {
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
    this.dataSource.data.forEach(row => {
      if(!this.selectionReject.isSelected(row)){
        this.selectionAprove.select(row);
      }
    });
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
    });
  }
}
