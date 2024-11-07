import { ProfessorModel } from './../../models/professor.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CursoModel } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';

@Component({
  selector: 'app-tela-home-teacher',
  templateUrl: './tela-home-teacher.component.html',
  styleUrls: ['./tela-home-teacher.component.scss'],
})
export class TelaHomeTeacherComponent implements OnInit, OnDestroy {
  public data: {
    name: 'Cursos' | 'Professores' | 'Administradores';
    arr: any[];
  }[] = [];
  public dataProfessorAdm: any[] = [];
  public dataCursos: any[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private professorService: ProfessorService,
    private cursoService: CursoService
  ) {
    this.professorService.getAllProfessores().subscribe(
      (dadosProfessores) => {
        this.dataProfessorAdm = dadosProfessores;
        this.processarDados();
      },
      (error) => {
        console.error('Erro ao carregar dados dos professores:', error);
      }
    );
    this.cursoService.getAllCursos().subscribe(
      (dadosCursos) => {
        this.dataCursos = dadosCursos;
        this.processarDados();
      },
      (error) => {
        console.error('Erro ao carregar dados dos cursos:', error);
      }
    );
  }
  ngOnDestroy(): void {}

  ngOnInit() {}

  private processarDados() {
    const professores = this.dataProfessorAdm.filter(
      (professor) => professor.adm === false
    );
    const cursos = this.dataCursos.length > 0 ? this.dataCursos : [];

    this.data = [
      { name: 'Professores', arr: professores },
      { name: 'Cursos', arr: cursos },
    ];
  }

  public redirectHorarios() {
    this.router.navigate(['/tela-mapa-horario-salas']);
  }

  public redirectReserve() {
    const dialogT = this.dialog.open(TelaReservasComponent, {
      width: '400px',
    });
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }
  logout() {
    this.router.navigate(['/']);
  }
  public seeMore(items: CursoModel[] & ProfessorModel[]): void {}
}
