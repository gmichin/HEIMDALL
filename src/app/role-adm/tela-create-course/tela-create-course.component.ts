import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { RegisterUserService } from 'src/app/services/register-user.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-tela-create-course',
  templateUrl: './tela-create-course.component.html',
  styleUrls: ['./tela-create-course.component.scss'],
})
export class TelaCreateCourseComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private registerUserService: RegisterUserService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<TelaCreateCourseComponent>
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      adm: ['', [Validators.required]],
    });
  }

  adms: RegisterUserResponse[] =
    this.sessionService.getSessionData<RegisterUserResponse[]>('adms').retorno;
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
    const institution_id =
      this.sessionService.getSessionData<string>('idInstitution').retorno;
    const cursos =
      this.sessionService.getSessionData<CourseModelResponse[]>('courses');
    const curso = new CourseModelResponse({
      institution_id,
      name: this.form.get('nome')?.value,
      adm_id: this.form.get('adm')?.value,
    });
    if (!cursos.valido) {
      cursos.retorno = [];
    }
    cursos.retorno.push(curso);
    this.sessionService.setItem('courses', cursos.retorno);

    this.snackBar.open('Dados cadastrados com sucesso.', '', {
      duration: 1000,
    });
    this.dialogRef.close();
  }
}
