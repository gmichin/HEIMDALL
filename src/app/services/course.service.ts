import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { CourseModelRequest, CourseModelResponse } from '../models/course.model';
import { url_config } from '../url.config';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  public getAllCourses(): Observable<CourseModelResponse[]> {
    const id = this.sessionService.getSessionData('idInstitution').retorno;
    const url = `${url_config.url_course}/course-institution/${id}`;
    return this.http.get<CourseModelResponse[]>(url).pipe(
      catchError(()=> {
        return of([]);
      })
    );
  }

  public createCourse(course: CourseModelRequest) {
    return this.http.post(url_config.url_course, course);
  }

  public updateCourse(course: CourseModelResponse) {
    return this.http.patch(`${url_config.url_course}/${course._id}`, course);
  }
}
