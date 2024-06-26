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
import { RoomsModel } from 'src/app/models/rooms.model';
import { RoomService } from 'src/app/services/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReloadService } from 'src/app/services/reload.service';
import { TelaMateriasComponent } from '../tela-materias.component';
import { CourseService } from 'src/app/services/course.service';
import { CourseModelResponse } from 'src/app/models/course.model';
import { ClassService } from 'src/app/services/class.service';
import { ClassModel } from 'src/app/models/class.model';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { RoleId } from 'src/app/models/role.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { SessionService } from 'src/app/services/session.service';

interface Sala {
  number: number;
  cadeiras: number;
  mesas: number;
  cadeirasPorMesa: number;
  computadores: number;
  capacidade: number;
  projetor: number;
  status : string;
}

@Component({
  selector: 'app-tela-materias-feitas',
  templateUrl: './tela-materias-feitas.component.html',
  styleUrls: ['./tela-materias-feitas.component.scss']
})
export class TelaMateriasFeitasComponent {
  displayedColumns: string[] = ['remove','edit','name', 'description'];
  dataSource = new MatTableDataSource<ClassModel>();
  selectionCourse = new SelectionModel<string>(true, []);
  selection = new SelectionModel<ClassModel>(true, []);
  selectionReject = new SelectionModel<ClassModel>(true, []);
  courseList!: CourseModelResponse[];  
  public dataUser = <RegisterUserResponse>this.sessionService.getSessionData('user').retorno;
  public id = this.dataUser._id;
  public role = '';

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private reloadService: ReloadService,
    private classService: ClassService,
    private router: Router,    
    private sessionService: SessionService,
    private reload: ReloadService
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
    this.courseService.getAllCourses().subscribe({
      next: cursos => {
        this.courseList = cursos;
      }
    });
  }
  goBack(){
    if(this.role=="Administrador") this.router.navigate(['/home-adm']);
    else if(this.role=="Professor") this.router.navigate(['/home-teacher']);
    else if(this.role=="Aluno") this.router.navigate(['/home-student']);
  }
  logout(){
    this.router.navigate(['/']);
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }

  public redirectHomeAdm() {
    this.reload.reoladPage(['redirecionar'])
  }
  
  private dialogCloseSubs() {
    this.reload.reoladPage(['redirecionar']);
  }

  openReservas() {
    const dialogRef = this.dialog.open(TelaReservasComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMaterias() {
    const dialogRef = this.dialog.open(TelaMateriasComponent);
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

  changeCourse(event: any){
    this.selectionCourse.clear();
    this.selectionCourse.toggle(event);
    this.classService.getClassByCourse(this.selectionCourse.selected[0]).subscribe({
      next: res => {
        this.dataSource.data = res;
      },
      error: err => {
        this.snackBar.open('Ocorreu um erro durante a busca por matérias, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-materias-feitas']);
      }
    })
  }

  @ViewChild(MatTable)
  table!: MatTable<Sala>;

  editMateria() {
    this.classService.saveClassToEdit(this.selection.selected[0]);
  }

  apagarMaterias() {
    this.classService.deleteClass(this.selectionReject.selected).subscribe({
      next: res => {
        this.snackBar.open('Removida(s) com sucesso!', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-materias-feitas']);
      },
      error: err => {
        this.snackBar.open('Ocorreu um erro durante a solicitação, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-materias-feitas']);
      }
    })
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
}
