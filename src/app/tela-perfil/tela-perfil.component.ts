import { ProfessorService } from 'src/app/services/professor.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from './../services/session.service';
import { AlunoModel } from '../models/aluno.model';
import { ProfessorModel } from '../models/professor.model';
import { Router } from '@angular/router';

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
  public senhaAluno = this.dataAluno.senha;
  public senhaProfessor = this.dataProfessorAdm.senha;
  public registroAluno = this.dataAluno.registro;
  public registroProfessor = this.dataProfessorAdm.registro;

  public nome = this.dataAluno?.nome ?? this.dataProfessorAdm?.nome;
  public email = this.dataAluno?.email ?? this.dataProfessorAdm?.email;
  public senha = this.senhaAluno ?? this.senhaProfessor;
  public registro = this.registroAluno ?? this.registroProfessor;
  public anoAluno = this.dataAluno.ano_entrada;
  public senhaVisivel = false;

  public form!: FormGroup;

  constructor(
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TelaPerfilComponent>,
    private router: Router,
    private alunoService: AlunoService,
    private professorService: ProfessorService
  ) {
    if (this.dataProfessorAdm.professor_id) {
      this.tipoUsuario = this.dataProfessorAdm.adm
        ? 'Administrador'
        : 'Professor';
      this.criarFormularioProfessor(
        this.email,
        this.nome,
        this.tipoUsuario,
        this.registro,
        this.senha
      );
    } else if (this.dataAluno.aluno_id) {
      this.tipoUsuario = 'Aluno';
      this.criarFormularioAluno(
        this.email,
        this.nome,
        this.tipoUsuario,
        this.registro,
        this.senha,
        this.anoAluno
      );
    }
  }

  ngOnInit() {}

  private criarFormularioProfessor(
    email: string,
    nome: string,
    role: string,
    registro: string,
    senha: string
  ) {
    this.form = this.fb.group({
      email: [email, [Validators.required, this.emailValidator]],
      nome: [nome, [Validators.required]],
      role: [role, [Validators.required]],
      registro: [registro, [Validators.required]],
      senha: [senha, [Validators.required]],
    });
  }
  private criarFormularioAluno(
    email: string,
    nome: string,
    role: string,
    registro: string,
    senha: string,
    ano_entrada: number
  ) {
    this.form = this.fb.group({
      email: [email, [Validators.required, this.emailValidator]],
      nome: [nome, [Validators.required]],
      role: [role, [Validators.required]],
      registro: [registro, [Validators.required]],
      senha: [senha, [Validators.required]],
      ano_entrada: [ano_entrada, [Validators.required]],
    });
  }
  public salvar() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, revise os campos.', '', {
        duration: 1000,
      });
      return;
    }

    if (this.tipoUsuario == 'Aluno') {
      this.dataAluno.email = this.form.get('email')?.value;
      this.dataAluno.nome = this.form.get('nome')?.value;
      this.dataAluno.registro = this.form.get('registro')?.value;
      this.dataAluno.senha = this.form.get('senha')?.value;
      this.dataAluno.ano_entrada = this.form.get('ano_entrada')?.value;
      this.alunoService.atualizarAluno(this.dataAluno).subscribe({
        next: () => {
          this.snackBar.open('Dados Atualizados com sucesso.', '', {
            duration: 1000,
          });
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['inicial']);
            });
          this.dialogRef.close('close');
        },
        error: () => {
          this.snackBar.open('Ocorreu um erro durante sua solicitação.', '', {
            duration: 1000,
          });
          this.dialogRef.close();
        },
      });
    } else if (
      this.tipoUsuario == 'Professor' ||
      this.tipoUsuario == 'Administrador'
    ) {
      this.dataProfessorAdm.email = this.form.get('email')?.value;
      this.dataProfessorAdm.nome = this.form.get('nome')?.value;
      this.dataProfessorAdm.registro = this.form.get('registro')?.value;
      this.dataProfessorAdm.senha = this.form.get('senha')?.value;
      this.professorService
        .atualizarProfessor(this.dataProfessorAdm)
        .subscribe({
          next: () => {
            this.snackBar.open('Dados Atualizados com sucesso.', '', {
              duration: 1000,
            });
            if (this.tipoUsuario == 'Administrador') {
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['inicial']);
                });
            } else if (this.tipoUsuario == 'Professor') {
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['inicial']);
                });
            }
            this.dialogRef.close('close');
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
