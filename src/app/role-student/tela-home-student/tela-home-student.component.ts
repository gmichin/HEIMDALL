import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { RoleService } from 'src/app/services/role.service';
import { SessionService } from 'src/app/services/session.service';
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
      arr: CourseModelResponse[] & RegisterUserResponse[];
    }[]
  >this.activatedRoute.snapshot.data['dados'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {}
  ngOnDestroy(): void {}

  ngOnInit() {
  }

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
  logout(){
    this.router.navigate(['/']);
  }
  public seeMore(items: CourseModelResponse[] & RegisterUserResponse[]): void {}
}
