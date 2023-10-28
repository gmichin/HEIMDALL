import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';

@Component({
  selector: 'app-tela-home-adm',
  templateUrl: './tela-home-adm.component.html',
  styleUrls: ['./tela-home-adm.component.scss'],
})
export class TelaHomeAdmComponent implements OnInit {
  public data = <
    {
      courses: CourseModelResponse[];
      teachers: RegisterUserResponse[];
      admins: RegisterUserResponse[];
    }
  >this.activatedRoute.snapshot.data['dados'];

  public courses: CourseModelResponse[] = this.data.courses;
  public teachers: RegisterUserResponse[] = this.data.teachers;
  public admins: RegisterUserResponse[] = this.data.admins;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  public redirectProfile() {
    this.openDialog(TelaPerfilComponent);
  }
  public openDialog(component: any): void {
    this.dialog.open(component, {
      width: '400px',
    });
  }

  public createTeacher(): void {}

  public removeUser(user: RegisterUserResponse): void {}

  public createCourse(): void {}

  public editCourse(course: CourseModelResponse): void {}
}
