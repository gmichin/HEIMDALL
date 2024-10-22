import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { TelaSalasComponent } from '../tela-salas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalaModel } from 'src/app/models/sala.model';
import { CursoModel } from 'src/app/models/curso.model';
import { SessionService } from 'src/app/services/session.service';
import { SalaService } from 'src/app/services/sala.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaDisciplinasComponent } from 'src/app/tela-disciplinas/tela-disciplinas.component';
import { Router } from '@angular/router';
import { ProfessorModel } from 'src/app/models/professor.model';
import { AlunoModel } from 'src/app/models/aluno.model';
@Component({
  selector: 'app-tela-novas-salas',
  templateUrl: './tela-novas-salas.component.html',
  styleUrl: './tela-novas-salas.component.scss',
})
export class TelaNovasSalasComponent implements OnInit {
  public resgiterForm: FormGroup;
  public courses: CursoModel[] = [];
  public roomToEdit!: { valid: boolean; room: SalaModel };

  newSala: any[] = [];

  public dataProfessorAdm = <ProfessorModel>(
    this.sessionService.getSessionData('professor').retorno
  );
  public dataAluno = <AlunoModel>(
    this.sessionService.getSessionData('aluno').retorno
  );
  public idProfessor = this.dataProfessorAdm.professor_id;
  public idAluno = this.dataAluno.aluno_id;

  public tipoUsuario = '';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cursoService: CursoService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
    private salaService: SalaService,
    private router: Router
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
    this.roomToEdit = this.salaService.getRoomToEdit();

    this.resgiterForm = this.fb.group({
      ident_sala: [
        this.roomToEdit.valid ? this.roomToEdit.room.ident_sala : 0,
        [Validators.required],
      ],
      chairs: [
        this.roomToEdit.valid ? this.roomToEdit.room.num_cadeiras : 0,
        [Validators.required],
      ],
      tables: [
        this.roomToEdit.valid ? this.roomToEdit.room.num_mesas : 0,
        [Validators.required],
      ],
      computers: [
        this.roomToEdit.valid ? this.roomToEdit.room.num_computadores : 0,
        [Validators.required],
      ],
      projectors: [
        this.roomToEdit.valid ? this.roomToEdit.room.num_projetores : 0,
        [Validators.required],
      ],
      course: [
        this.roomToEdit.valid ? this.roomToEdit.room.sala_id : '',
        [Validators.required],
      ],
    });
  }
  ngOnInit(): void {
    this.cursoService.getAllCursos().subscribe({
      next: (res) => {
        this.courses = res;
        if (res.length == 0) {
          this.snackBar.open(
            'Ocorreu um erro durante a busca dos cursos, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
        }
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante a busca dos cursos, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  goBack() {
    if (this.tipoUsuario == 'Administrador')
      this.router.navigate(['/home-adm']);
    else if (this.tipoUsuario == 'Professor')
      this.router.navigate(['/home-teacher']);
    else if (this.tipoUsuario == 'Aluno')
      this.router.navigate(['/home-student']);
  }
  logout() {
    this.router.navigate(['/']);
  }
  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }

  public redirectHomeAdm() {
    this.router.navigate(['redirecionar']);
  }

  private dialogCloseSubs() {
    this.router.navigate(['redirecionar']);
  }

  public redirectMaterias() {
    const dialogT = this.dialog.open(TelaDisciplinasComponent, {
      width: '400px',
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
    const instituition_id =
      this.sessionService.getSessionData<string>('idInstitution').retorno;

    const room = new SalaModel({
      ident_sala: this.resgiterForm.get('ident_sala')?.value,
      num_cadeiras: this.resgiterForm.get('chairs')?.value,
      num_mesas: this.resgiterForm.get('tables')?.value,
      num_computadores: this.resgiterForm.get('computers')?.value,
      num_projetores: this.resgiterForm.get('projectors')?.value,
      num_lousas: this.resgiterForm.get('projectors')?.value,
      status: this.resgiterForm.get('status')?.value,
    });

    if (this.roomToEdit.valid) {
      room.sala_id = this.roomToEdit.room.sala_id;
      this.salaService.updateRoom(room).subscribe({
        next: (res) => {
          this.snackBar.open('Atualizado com sucesso!', '', {
            duration: 4000,
          });
          this.router.navigate(['tela-novas-salas']);
        },
        error: (err) => {
          this.snackBar.open(
            'Ocorreu um erro durante a atualização, por favor, tente novamente mais tarde.',
            '',
            {
              duration: 4000,
            }
          );
        },
      });
      return;
    }
    this.salaService.createRoom(room).subscribe({
      next: (res) => {
        this.snackBar.open('Cadastrado com sucesso!', '', {
          duration: 4000,
        });
        this.router.navigate(['tela-novas-salas']);
      },
      error: (err) => {
        this.snackBar.open(
          'Ocorreu um erro durante o cadastro, por favor, tente novamente mais tarde.',
          '',
          {
            duration: 4000,
          }
        );
      },
    });
  }
}
