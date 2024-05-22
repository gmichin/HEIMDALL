import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { TelaSalasComponent } from '../tela-salas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomsModel } from 'src/app/models/rooms.model';
import { CourseModelResponse } from 'src/app/models/course.model';
import { SessionService } from 'src/app/services/session.service';
import { RoomService } from 'src/app/services/room.service';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-tela-novas-salas',
  templateUrl: './tela-novas-salas.component.html',
  styleUrl: './tela-novas-salas.component.scss'
})
export class TelaNovasSalasComponent implements OnInit {
  public resgiterForm: FormGroup;
  public courses: CourseModelResponse[] = [];

  newSala: any[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
    private roomService: RoomService,
    private reloadService: ReloadService
  ) {
    this.resgiterForm = this.fb.group(
      {
        number: [0, [Validators.required]],
        chairs: [0, [Validators.required]],
        tables: [0, [Validators.required]],
        chairByTables: [0, [Validators.required]],
        computers: [0, [Validators.required]],
        capacity: [0, [Validators.required]],
        projectors: [0, [Validators.required]],
        course: ['', [Validators.required]],
      }
    );
  }
  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: res => {
        this.courses = res;
        if(res.length == 0) {
          this.snackBar.open('Ocorreu um erro durante a busca dos cursos, por favor, tente novamente mais tarde.', '', {
            duration: 4000,
          });
        }
      },
      error: err => {
        this.snackBar.open('Ocorreu um erro durante a busca dos cursos, por favor, tente novamente mais tarde.', '', {
          duration: 2000,
        });
      }
    });
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

  public save() {
    const instituition_id = this.sessionService.getSessionData<string>(
      'idInstitution'
    ).retorno;

    const room = new RoomsModel({
      number: this.resgiterForm.get('number')?.value,
      chairs: this.resgiterForm.get('chairs')?.value,
      tables: this.resgiterForm.get('tables')?.value,
      chairByTables: this.resgiterForm.get('chairByTables')?.value,
      computers: this.resgiterForm.get('computers')?.value,
      capacity: this.resgiterForm.get('capacity')?.value,
      projectors: this.resgiterForm.get('projectors')?.value,
      course_id: this.resgiterForm.get('course')?.value,
      instituition_id,
      _id:'',
      status: 'DISPONIVEL',
    });
    
    this.roomService.createRoom(room).subscribe({
      next: res => {
        this.snackBar.open('Cadastrado com sucesso!', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-novas-salas']);
      },
      error: err => {
        this.snackBar.open('Ocorreu um erro durante a busca dos cursos, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
      }
    })
  }
}
