import { ProfessorModel } from './../../models/professor.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoModel } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { SessionService } from 'src/app/services/session.service';
import { TurmaModel } from 'src/app/models/turma.model';

@Component({
  selector: 'app-tela-edit-course',
  templateUrl: './tela-edit-course.component.html',
  styleUrls: ['./tela-edit-course.component.scss'],
})
export class TelaEditCourseComponent implements OnInit {
  public form!: FormGroup;
  adms: ProfessorModel[] =
    this.sessionService.getSessionData<ProfessorModel[]>('adms').retorno;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cursoService: CursoService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<TelaEditCourseComponent>,
    public turma: TurmaModel,
    @Inject(MAT_DIALOG_DATA) public data: CursoModel
  ) {
    let nameAdm;
    if (this.adms.length > 0) {
      nameAdm = this.adms.find(
        (adm) => adm.professor_id == this.turma.professor_id
      )?.nome;
      this.form = this.fb.group({
        nome: [data.nome, [Validators.required]],
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

    const curso = new CursoModel({
      nome: this.form.get('nome')?.value,
      descricao: this.form.get('descricao')?.value,
    });
    this.cursoService.atualizarCurso(curso).subscribe({
      next: (res) => {
        this.snackBar.open('Dados cadastrados com sucesso.', '', {
          duration: 2000,
        });
      },
      error: (err) => {
        this.snackBar.open('Ocorreu um erro durante sua solicitação.', '', {
          duration: 2000,
        });
      },
    });
    this.dialogRef.close();
  }
}
