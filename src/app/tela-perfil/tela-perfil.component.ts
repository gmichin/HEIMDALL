import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from './../services/session.service';
import { CadastroService } from '../services/cadastros.service';
import { AlunoModel } from '../models/aluno.model';
import { ProfessorModel } from '../models/professor.model';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss'],
})
export class TelaPerfilComponent implements OnInit {
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );

  public tipoUsuario = '';
  public nomeAluno = this.dataAluno.nome;
  public emailAluno = this.dataAluno.email;
  public nomeProfessor = this.dataProfessorAdm.nome;
  public emailProfessor = this.dataProfessorAdm.email;

  public form: FormGroup;

  constructor(
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TelaPerfilComponent>,
    public cadastro: CadastroService
  ) {
    switch (this.dataProfessorAdm.adm) {
      case true:
        this.tipoUsuario = 'Administrador';
        break;
      case false:
        this.tipoUsuario = 'Professor';
        break;
    }
    if (this.dataAluno) this.tipoUsuario = 'Aluno';

    this.form = this.fb.group({
      email: [this.dataAluno.email, [Validators.required, this.emailValidator]],
      name: [this.dataAluno.nome, [Validators.required]],
      role: [
        this.tipoUsuario == 'Aluno' ? 'Aluno' : 'Professor',
        [Validators.required],
      ],
    });
  }

  ngOnInit() {}

  public save() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, revise os campos.', '', {
        duration: 1000,
      });
      return;
    }

    if (this.tipoUsuario == 'Aluno') {
      this.dataAluno.email = this.form.get('email')?.value;
      this.dataAluno.nome = this.form.get('name')?.value;
      this.cadastro.atualizarUsuário(this.dataAluno).subscribe({
        next: () => {
          this.snackBar.open('Dados Atualizados com sucesso.', '', {
            duration: 1000,
          });
          this.dialogRef.close();
        },
        error: () => {
          this.snackBar.open('Ocorreu um erro durante sua solicitação.', '', {
            duration: 1000,
          });
          this.dialogRef.close();
        },
      });
    } else if (this.tipoUsuario == 'Professor' || this.tipoUsuario == 'Adm') {
      this.dataProfessorAdm.email = this.form.get('email')?.value;
      this.dataProfessorAdm.nome = this.form.get('name')?.value;
      this.cadastro.atualizarUsuário(this.dataProfessorAdm).subscribe({
        next: () => {
          this.snackBar.open('Dados Atualizados com sucesso.', '', {
            duration: 1000,
          });
          this.dialogRef.close();
        },
        error: () => {
          this.snackBar.open('Ocorreu um erro durante sua solicitação.', '', {
            duration: 1000,
          });
          this.dialogRef.close();
        },
      });
    }
  }

  private emailValidator(control: any) {
    const value = control.value;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (value && !pattern.test(value)) {
      return { email: true };
    }
    return null;
  }
}
