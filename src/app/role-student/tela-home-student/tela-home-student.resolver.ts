import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EMPTY, Observable, map, of, switchMap } from 'rxjs';
import { CourseModelResponse } from 'src/app/models/course.model';
import { RegisterUserResponse } from 'src/app/models/register.models';
import { CourseService } from 'src/app/services/course.service';
import { InternsService } from 'src/app/services/interns.service';

@Injectable({
  providedIn: 'root',
})
export class telaHomeStudentResolver implements Resolve<any> {
  constructor(
    private courseService: CourseService,
    private interns: InternsService
  ) {}

  resolve(){
    return of(EMPTY);
  }
}
