import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseModelRequest, CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { CourseService } from 'src/app/services/course.service';
import { RegisterUserService } from 'src/app/services/register-user.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-tela-edit-course',
  templateUrl: './tela-edit-course.component.html',
  styleUrls: ['./tela-edit-course.component.scss'],
})
export class TelaEditCourseComponent implements OnInit {
  public form!: FormGroup;
  adms: RegisterUserResponse[] =
    this.sessionService.getSessionData<RegisterUserResponse[]>('adms').retorno;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<TelaEditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseModelResponse
  ) {
    let nameAdm;
    if (this.adms.length > 0) {
      nameAdm = this.adms.find((adm) => adm._id == data.adm_id)?.name;
      this.form = this.fb.group({
        nome: [data.name, [Validators.required]],
        adm: [nameAdm, [Validators.required]],
      });
    }
  }

  admValue: string = '';
  validate = this.sessionService.getSessionData('adms').valido;

  ngOnInit() {}

  public save() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, revise os campos.', '', {
        duration: 1000,
      });
      return;
    }
    const instituition = this.sessionService.getSessionData<string>('idInstitution').retorno;
  
    const curso = new CourseModelResponse({
      instituition,
      name: this.form.get('nome')?.value,
      adm_id: this.form.get('adm')?.value,
    });
    this.courseService.updateCourse(curso).subscribe({
      next: res => {
        this.snackBar.open('Dados cadastrados com sucesso.', '', {
          duration: 2000,
        });
      },
      error: err => {
        this.snackBar.open('Ocorreu um erro durante sua solicitação.', '', {
          duration: 2000,
        });
      }
    });
    this.dialogRef.close();
  }
}
