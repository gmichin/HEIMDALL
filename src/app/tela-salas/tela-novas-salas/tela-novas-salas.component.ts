import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { TelaSalasComponent } from '../tela-salas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalaModel } from 'src/app/models/sala.model';
import { CursoModel } from 'src/app/models/curso.model';
import { SalaService } from 'src/app/services/sala.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaDisciplinasComponent } from 'src/app/tela-disciplinas/tela-disciplinas.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tela-novas-salas',
  templateUrl: './tela-novas-salas.component.html',
  styleUrl: './tela-novas-salas.component.scss',
})
export class TelaNovasSalasComponent implements OnInit {
  public resgiterForm: FormGroup;
  public courses: CursoModel[] = [];
  public salaToEdit: { valid: boolean; sala: SalaModel } = {
    valid: false,
    sala: {} as SalaModel,
  };

  public tipoUsuario = '';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private salaService: SalaService,
    private router: Router
  ) {
    this.salaToEdit = this.salaService.getSalaToEdit();
    this.resgiterForm = this.fb.group({
      ident_sala: [
        this.salaToEdit.valid ? this.salaToEdit.sala.ident_sala : 0,
        [Validators.required],
      ],
      status: [
        this.salaToEdit.valid ? this.salaToEdit.sala.status : false,
        [Validators.required],
      ],
      num_cadeiras: [
        this.salaToEdit.valid ? this.salaToEdit.sala.num_cadeiras : 0,
        [Validators.required],
      ],
      num_mesas: [
        this.salaToEdit.valid ? this.salaToEdit.sala.num_mesas : 0,
        [Validators.required],
      ],
      num_computadores: [
        this.salaToEdit.valid ? this.salaToEdit.sala.num_computadores : 0,
        [Validators.required],
      ],
      num_projetores: [
        this.salaToEdit.valid ? this.salaToEdit.sala.num_projetores : 0,
        [Validators.required],
      ],
      num_lousas: [
        this.salaToEdit.valid ? this.salaToEdit.sala.num_lousas : 0,
        [Validators.required],
      ],
    });
  }
  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['/home-adm']);
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
    const sala = new SalaModel({
      ident_sala: this.resgiterForm.get('ident_sala')?.value,
      num_cadeiras: this.resgiterForm.get('num_cadeiras')?.value,
      num_mesas: this.resgiterForm.get('num_mesas')?.value,
      num_computadores: this.resgiterForm.get('num_computadores')?.value,
      num_projetores: this.resgiterForm.get('num_projetores')?.value,
      num_lousas: this.resgiterForm.get('num_lousas')?.value,
      status: this.resgiterForm.get('status')?.value,
    });

    if (this.salaToEdit.valid) {
      sala.sala_id = this.salaToEdit.sala.sala_id;
      this.salaService.atualizarSala(sala).subscribe({
        next: (res) => {
          this.snackBar.open('Atualizado com sucesso!', '', {
            duration: 4000,
          });
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['home-adm']);
            });
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
    this.salaService.criarSala(sala).subscribe({
      next: (res) => {
        this.snackBar.open('Cadastrado com sucesso!', '', {
          duration: 4000,
        });
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['home-adm']);
          });
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
