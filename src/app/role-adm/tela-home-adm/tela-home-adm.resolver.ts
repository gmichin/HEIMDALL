import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { CourseService } from 'src/app/services/course.service';

@Injectable({
  providedIn: 'root',
})
export class telaHomeAdmResolver implements Resolve<any> {
  constructor(private courseService: CourseService) {}

  resolve(): Observable<{
    courses: CourseModelResponse[];
    teachers: RegisterUserResponse[];
    admins: RegisterUserResponse[];
  }> {
    return of({
      courses: <CourseModelResponse[]>[
        { name: 'Analise e Desenvolvimento de Sistemas' },
        { name: 'Engenharia Elétrica' },
      ],
      teachers: <RegisterUserResponse[]>[
        { name: 'Antônio Paladino' },
        { name: 'Braz' },
      ],
      admins: <RegisterUserResponse[]>[
        { name: 'Érico Lima' },
        { name: 'Wesley Vieira' },
      ],
    });
    // return this.courseService.getAllCourses();
  }
}
