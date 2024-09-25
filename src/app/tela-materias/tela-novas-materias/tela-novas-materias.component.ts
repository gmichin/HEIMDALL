import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomsModel } from 'src/app/models/rooms.model';
import { CourseModelResponse } from 'src/app/models/course.model';
import { SessionService } from 'src/app/services/session.service';
import { RoomService } from 'src/app/services/room.service';
import { ReloadService } from 'src/app/services/reload.service';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaMateriasComponent } from '../tela-materias.component';
import { InternsService } from 'src/app/services/interns.service';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { ClassModel } from 'src/app/models/class.model';
import { ClassService } from 'src/app/services/class.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { RoleId } from 'src/app/models/role.model';

@Component({
  selector: 'app-tela-novas-materias',
  templateUrl: './tela-novas-materias.component.html',
  styleUrl: './tela-novas-materias.component.scss',
})
export class TelaNovasMateriasComponent implements OnInit {
  public resgiterForm: FormGroup;
  public courses: CourseModelResponse[] = [];
  public teachersList: RegisterUserResponse[] = [];
  public classToEdit!: { valid: boolean; class: ClassModel };

  newSala: any[] = [];
  public dataUser = <RegisterUserResponse>(
    this.sessionService.getSessionData('user').retorno
  );
  public id = this.dataUser._id;
  public role = '';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
    private internsService: InternsService,
    private reloadService: ReloadService,
    private classService: ClassService,
    private router: Router,
    private reload: ReloadService
  ) {
    switch (this.dataUser.role) {
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
    this.classToEdit = this.classService.getClassToEdit();

    this.resgiterForm = this.fb.group({
      name: [
        this.classToEdit.valid ? this.classToEdit.class.name : '',
        [Validators.required],
      ],
      description: [
        this.classToEdit.valid ? this.classToEdit.class.description : '',
        [Validators.required],
      ],
      teachers_id: [
        this.classToEdit.valid ? this.classToEdit.class.teachers_id : [],
        [Validators.required],
      ],
      course_id: [
        this.classToEdit.valid ? this.classToEdit.class.course_id : '',
        [Validators.required],
      ],
    });
  }
  ngOnInit(): void {
    this.internsService.getAllTeachers().subscribe({
      next: (res) => {
        this.teachersList = res;
        if (res.length == 0) {
          this.snackBar.open(
            'Ocorreu um erro durante a busca dos professores, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
        }
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante a busca dos professores, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 2000,
          }
        );
      },
    });

    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res;
        if (res.length == 0) {
          this.snackBar.open(
            'Ocorreu um erro durante a busca dos cursos, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
        }
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante a busca dos cursos, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  goHome() {
    if (this.role == 'Administrador') this.router.navigate(['/home-adm']);
    else if (this.role == 'Professor') this.router.navigate(['/home-teacher']);
    else if (this.role == 'Aluno') this.router.navigate(['/home-student']);
  }
  logout() {
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
    this.reload.reoladPage(['redirecionar']);
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

  openSalas() {
    const dialogRef = this.dialog.open(TelaSalasComponent);
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

  public save() {
    const instituition_id =
      this.sessionService.getSessionData<string>('idInstitution').retorno;

    const materia = new ClassModel({
      name: this.resgiterForm.get('name')?.value,
      description: this.resgiterForm.get('description')?.value,
      teachers_id: this.resgiterForm.get('teachers_id')?.value,
      course_id: this.resgiterForm.get('course_id')?.value,
      _id: '',
    });

    if (this.classToEdit.valid) {
      materia._id = this.classToEdit.class._id;
      this.classService.updateClass(materia).subscribe({
        next: (res) => {
          this.snackBar.open('Atualizado com sucesso!', '', {
            duration: 4000,
          });
          this.reloadService.reoladPage(['tela-novas-materias']);
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a atualização, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
        },
      });
      return;
    }
    this.classService.createClass(materia).subscribe({
      next: (res) => {
        this.snackBar.open('Cadastrado com sucesso!', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-novas-materias']);
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante o cadastro, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 4000,
          }
        );
      },
    });
  }
}
