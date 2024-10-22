import { ProfessorModel } from './../../models/professor.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoModel } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { CadastroService } from 'src/app/services/cadastros.service';
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
    private cursoService: CursoService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<TelaCreateCourseComponent>
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      adm: ['', [Validators.required]],
    });
  }

  adms: ProfessorModel[] =
    this.sessionService.getSessionData<ProfessorModel[]>('adms').retorno;
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
      disciplina_id: this.form.get('disciplina_id')?.value,
    });

    this.cursoService.criarCurso(curso).subscribe({
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
