import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassModel } from '../models/class.model';
import { url_config } from '../url.config';
import { Observable, forkJoin, map } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { RegisterUserResponse } from '../models/register.models';
import { RoleId } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) { }


  public createClass(materia: ClassModel){
    return this.http.post(url_config.url_class, materia);
  }

  public updateClass(materia: ClassModel) {
    return this.http.patch(`${url_config.url_class}/${materia._id}`, materia);
  }
 
  public deleteClass(materia: ClassModel[]) {
    const arrReqs: Observable<any>[] = [];
    materia.forEach(r => {
      arrReqs.push(this.http.delete(`${url_config.url_class}/${r._id}`));
    });

    return forkJoin(...arrReqs);
  }

  public getClassByCourse(courseId: string): Observable<ClassModel[]> {
    return this.http.get<ClassModel[]>(`${url_config.url_class}/by-course/${courseId}`);
  }

  public getTeacherByClass(classId: string): Observable<RegisterUserResponse[]> {
    return this.http.get<RegisterUserResponse[]>(`${url_config.url_class}/teachers/${classId}`).pipe(
      map(teachers => {
        const user = this.sessionService.getSessionData<RegisterUserResponse>('user').retorno;
        if(user.role == RoleId.PROFESSOR) {
          return teachers.filter(t => t._id == user._id)
        }
        return teachers
      })
    );
  }

  public saveClassToEdit(matria: ClassModel){
    this.sessionService.setItem('editClass', matria);
    this.router.navigate(['tela-novas-materias']);
  }

  public getClassToEdit(): {class: ClassModel, valid: boolean} {
    const materia = this.sessionService.getSessionData<ClassModel>('editClass');
    if(materia.valido) {
      sessionStorage.removeItem('editClass');
      return {valid: true, class: materia.retorno};
    }
    return {valid: false, class: {} as ClassModel};
  }

}
