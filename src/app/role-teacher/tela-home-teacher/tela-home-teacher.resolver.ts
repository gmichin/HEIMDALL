import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { CourseService } from 'src/app/services/course.service';
import { InternsService } from 'src/app/services/interns.service';

@Injectable({
  providedIn: 'root',
})
export class telaHomeTeacherResolver implements Resolve<any> {
  constructor(
    private courseService: CourseService,
    private interns: InternsService
  ) {}

  resolve(): Observable<
    {
      name: string;
      arr: CourseModelResponse[] | RegisterUserResponse[];
    }[]
  > {
    return this.courseService.getAllCourses().pipe(
      switchMap((courses) =>
        this.interns.getAllAdms().pipe(
          switchMap((adms) =>
            this.interns.getAllTeachers().pipe(
              map((teachers) => [
                {
                  name: 'Cursos',
                  arr: courses,
                },
                {
                  name: 'Professores',
                  arr: teachers,
                },
                {
                  name: 'Administradores',
                  arr: adms,
                },
              ])
            )
          )
        )
      )
    );
  }
}
