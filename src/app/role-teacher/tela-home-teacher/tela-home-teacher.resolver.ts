import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { CursoModel } from 'src/app/models/curso.model';
import { ProfessorModel } from 'src/app/models/professor.model';
import { CursoService } from 'src/app/services/curso.service';
import { InternsService } from 'src/app/services/interns.service';

@Injectable({
  providedIn: 'root',
})
export class telaHomeTeacherResolver implements Resolve<any> {
  constructor(
    private cursoService: CursoService,
    private interns: InternsService
  ) {}

  resolve(): Observable<
    {
      name: string;
      arr: CursoModel[] | ProfessorModel[];
    }[]
  > {
    return this.cursoService.getAllCursos().pipe(
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
