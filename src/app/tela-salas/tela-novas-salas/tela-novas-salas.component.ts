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
  save(){
    
  }
}
