import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EMPTY, Observable, map, of, switchMap } from 'rxjs';
import { CursoModel } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { InternsService } from 'src/app/services/interns.service';

@Injectable({
  providedIn: 'root',
})
export class telaHomeStudentResolver implements Resolve<any> {
  constructor(
    private cursoService: CursoService,
    private interns: InternsService
  ) {}

  resolve() {
    return of(EMPTY);
  }
}
