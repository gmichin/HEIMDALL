import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoModel } from 'src/app/models/aluno.model';
import { CursoModel } from 'src/app/models/curso.model';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';

@Component({
  selector: 'app-tela-home-student',
  templateUrl: './tela-home-student.component.html',
  styleUrls: ['./tela-home-student.component.scss'],
})
export class TelaHomeStudentComponent implements OnInit, OnDestroy {
  public data = <
    {
      name: 'Cursos' | 'Professores' | 'Administradores';
      arr: CursoModel[] & AlunoModel[];
    }[]
  >this.activatedRoute.snapshot.data['dados'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {}

  ngOnInit() {}

  public redirectHorarios() {
    this.router.navigate(['/tela-mapa-horario-salas']);
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }

  private dialogCloseSubs() {
    this.router.navigate(['reload']);
  }
  logout() {
    this.router.navigate(['/']);
  }
  public seeMore(items: CursoModel[] & AlunoModel[]): void {}
}
