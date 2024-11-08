import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { Observable, forkJoin, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { InteresseModel } from '../models/interesse.model';

@Injectable({
  providedIn: 'root',
})
export class InteresseService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) {}
  public getAllInteresses(): Observable<InteresseModel[]> {
    const url = `${url_config.url_interesse}`;
    return this.http.get<InteresseModel[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }
  public criarInteresse(interesse: InteresseModel) {
    if ('_id' in interesse) {
      delete interesse._id;
    }
    return this.http.post(url_config.url_interesse, interesse);
  }

  public carregarDadosInteresse() {
    return this.http.get<any[]>(url_config.url_interesse);
  }

  public atualizarInteresse(interesse: InteresseModel) {
    return this.http.patch(
      `${url_config.url_interesse}/${interesse.interesse_id}`,
      interesse
    );
  }

  public deleteInteresse(interesse: InteresseModel[]) {
    const arrReqs: Observable<any>[] = [];
    interesse.forEach((r) => {
      arrReqs.push(
        this.http.delete(`${url_config.url_interesse}/${r.interesse_id}`)
      );
    });

    return forkJoin(...arrReqs);
  }

  public saveInteresseToEdit(interesse: InteresseModel) {
    this.sessionService.setItem('editInteresse', interesse);
    this.router.navigate(['solicitar-interesse']);
  }

  public getInteresseToEdit(): { interesse: InteresseModel; valid: boolean } {
    const interesse =
      this.sessionService.getSessionData<InteresseModel>('editInteresse');
    if (interesse.valido) {
      sessionStorage.removeItem('editInteresse');
      return { valid: true, interesse: interesse.retorno };
    }
    return { valid: false, interesse: {} as InteresseModel };
  }
}
