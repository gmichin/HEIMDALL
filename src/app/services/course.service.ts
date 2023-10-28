import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModelResponse } from '../models/course.model';
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
    const url = `${url_config.url_course}/${id}`;
    return this.http.get<CourseModelResponse[]>(url);
  }
}
