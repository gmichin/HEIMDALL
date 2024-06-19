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
import { CourseService } from 'src/app/services/course.service';
import { CourseModelResponse } from 'src/app/models/course.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassModel } from 'src/app/models/class.model';
import { SelectionModel } from '@angular/cdk/collections';
import { LoaderService } from 'src/app/services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassService } from 'src/app/services/class.service';
import { ReloadService } from 'src/app/services/reload.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReserveModel } from 'src/app/models/reserve.model';
import { RoleId } from 'src/app/models/role.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { SessionService } from 'src/app/services/session.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';

interface Sala {
  room_id: string;
  user_id: string | undefined;
  class_id: string | undefined;
  start_time: Date;
  end_time: Date;
}

@Component({
  selector: 'app-tela-reservas-feitas',
  templateUrl: './tela-reservas-feitas.component.html',
  styleUrls: ['./tela-reservas-feitas.component.scss']
})
export class TelaReservasFeitasComponent {
  salas: Sala[] = [];
  displayedColumns: string[] = ['remove','numero', 'professor', 'start_time', 'end_time'];
  idSalaReservada: any[] = [];
  salasFiltradas: any[] = [];
  numeroSala: any[] = [];
  professores: any[] = [];
  classes: any[] = [];
  
  public courseList: CourseModelResponse[] = [];
  public classList: ClassModel[] = [];
  public reserveList: ReserveModel[] = [];
  dataSource = new MatTableDataSource<ReserveModel>();
  selectionReject = new SelectionModel<ReserveModel>(true, []);

  
  public selectionCourse = new SelectionModel<string>(true, []);
  public selectionClass = new SelectionModel<string>(true, []);
  public resgiterForm!: FormGroup;

  constructor(
    private reservationService: ReservationService,
    public dialog: MatDialog,
    private router: Router,
    private courseService: CourseService,
    private sessionService: SessionService,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
    private classService: ClassService,
    private fb: FormBuilder,
    private reloadService: ReloadService,
  ) {
    this.resgiterForm = this.fb.group(
      {
        course_id: ['', [Validators.required]],
        class_id: ['', [Validators.required]],
      },
    );
    this.courseService.getAllCourses().subscribe({
      next: cursos => {
        this.courseList = cursos;
        // if(cursos.length == 0){
        //   this.errorMessage.message = 'Não foram encontrados cursos cadastrados.'
        //   this.errorMessage.invalid = true;
        // }
      },
      error: err => {
        // this.errorMessage.message = 'Não foi possível buscar os cursos.'
        // this.errorMessage.invalid = true;
      }
    });
  }

  changeCourse(event: any){
    this.selectionCourse.clear();
    this.selectionCourse.toggle(event);
    this.loaderService.showLoader();
    this.classService.getClassByCourse(this.selectionCourse.selected[0]).subscribe({
      next: res => {
        this.classList = res;
        this.loaderService.hideLoader();
      },
      error: err => {
        this.loaderService.hideLoader();
        this.snackBar.open('Ocorreu um erro durante a busca por matérias, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-reservas-feitas']);
      }
    });
  }
  
  changeClass(event: any){
    this.selectionClass.clear();
    this.selectionClass.toggle(event);
  }

  public redirectHomeAdm() {
    this.reloadService.reoladPage(['redirecionar'])
  }

  search() {
    this.loaderService.showLoader();
    this.reservationService.findByClass(this.selectionClass.selected[0]).subscribe({
      next: res => {
        this.dataSource.data = res;
        this.loaderService.hideLoader();
        if(res.length == 0) {
          this.snackBar.open('Não foram encontradas reservas para sua busca.', '', {
            duration: 4000,
          });
          this.reloadService.reoladPage(['tela-reservas-feitas']);
        }
      },
      error: err => {
        this.loaderService.hideLoader();
        this.snackBar.open('Ocorreu um erro durante a busca por reservas, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-reservas-feitas']);
      }
    })
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
  table!: MatTable<Sala>;

  addData() {
    this.router.navigate(['/tela-novas-reservas']);
  }

  removeData() {
    this.reservationService.deleteReserve(this.selectionReject.selected).subscribe({
      next: res => {
        this.snackBar.open('Removida(s) com sucesso!', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-reservas-feitas']);
      },
      error: err => {
        this.snackBar.open('Ocorreu um erro durante a solicitação, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-reservas-feitas']);
      }
    })
  }

  validaRole() {
    const user = this.sessionService.getSessionData<RegisterUserResponse>('user').retorno;
    return user.role == RoleId.ADM;
  }

  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach(row => {
      if(!this.selectionReject.isSelected(row)){
        this.selectionReject.select(row);
      }
    })
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }

  goBack(){
    this.router.navigate(['/home-adm']);
  }
  logout(){
    this.router.navigate(['/']);
  }
  
  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }
}
