import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from './../services/session.service';
import { CadastroService } from '../services/cadastros.service';
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

  public form!: FormGroup;

  constructor(
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TelaPerfilComponent>,
    private router: Router,
    public cadastro: CadastroService
  ) {
    if (this.dataProfessorAdm.adm) {
      this.tipoUsuario = 'Administrador';
      this.criarFormulario(
        this.dataProfessorAdm.email,
        this.dataProfessorAdm.nome,
        this.tipoUsuario
      );
    } else if (!this.dataProfessorAdm.adm) {
      this.tipoUsuario = 'Professor';
      this.criarFormulario(
        this.dataProfessorAdm.email,
        this.dataProfessorAdm.nome,
        this.tipoUsuario
      );
    } else if (this.dataAluno) {
      this.tipoUsuario = 'Aluno';
      this.criarFormulario(
        this.dataAluno.email,
        this.dataAluno.nome,
        this.tipoUsuario
      );
    }
  }

  ngOnInit() {}

  private criarFormulario(email: string, nome: string, role: string) {
    this.form = this.fb.group({
      email: [email, [Validators.required, this.emailValidator]],
      nome: [nome, [Validators.required]],
      role: [role, [Validators.required]],
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
      console.log(this.dataAluno);
      this.dataAluno.email = this.form.get('email')?.value;
      this.dataAluno.nome = this.form.get('nome')?.value;
      this.cadastro.atualizarAluno(this.dataAluno).subscribe({
        next: () => {
          this.snackBar.open('Dados Atualizados com sucesso.', '', {
            duration: 1000,
          });
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['home-adm']);
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
      console.log(this.dataProfessorAdm);
      this.dataProfessorAdm.email = this.form.get('email')?.value;
      this.dataProfessorAdm.nome = this.form.get('nome')?.value;
      this.cadastro.atualizarProfessor(this.dataProfessorAdm).subscribe({
        next: () => {
          this.snackBar.open('Dados Atualizados com sucesso.', '', {
            duration: 1000,
          });
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['home-adm']);
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
