import { ProfessorModel } from './../../models/professor.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoModel } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-edit-course',
  templateUrl: './tela-edit-course.component.html',
  styleUrls: ['./tela-edit-course.component.scss'],
})
export class TelaEditCourseComponent implements OnInit {
  public form!: FormGroup;

  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );

  public validate: boolean;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cursoService: CursoService,
    private sessionService: SessionService,
    private router: Router,
    public dialogRef: MatDialogRef<TelaEditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CursoModel
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
    });
    if (this.dataProfessorAdm.adm) {
      this.validate = true;
    } else {
      this.validate = false;
    }
  }

  ngOnInit() {}

  public save() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, revise os campos.', '', {
        duration: 1000,
      });
      return;
    }

    const curso = new CursoModel({
      curso_id: this.data.curso_id,
      nome: this.form.get('nome')?.value,
      descricao: this.form.get('descricao')?.value,
    });
    this.cursoService.atualizarCurso(curso).subscribe({
      next: (res) => {
        this.snackBar.open('Dados cadastrados com sucesso.', '', {
          duration: 3000,
        });
        this.router.navigate(['home-adm']);
        this.dialogRef.close('close');
      },
      error: (err) => {
        this.snackBar.open('Ocorreu um erro durante sua solicitação.', '', {
          duration: 3000,
        });
      },
    });
    this.dialogRef.close();
  }
}
