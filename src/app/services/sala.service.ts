import { SalaModel } from '../models/sala.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { SessionService } from './session.service';
import { Observable, forkJoin, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) {}

  public criarSala(sala: SalaModel) {
    if ('_id' in sala) {
      delete sala._id;
    }
    return this.http.post(url_config.url_sala, sala);
  }

  public carregarDadosSalas() {
    return this.http.get<any[]>(url_config.url_sala);
  }

  public atualizarSala(sala: SalaModel) {
    return this.http.patch(`${url_config.url_sala}/${sala.sala_id}`, sala);
  }

  public deleteSala(sala: SalaModel[]) {
    const arrReqs: Observable<any>[] = [];
    sala.forEach((r) => {
      arrReqs.push(this.http.delete(`${url_config.url_sala}/${r.sala_id}`));
    });

    return forkJoin(...arrReqs);
  }

  public saveSalaToEdit(sala: SalaModel) {
    this.sessionService.setItem('editsala', sala);
    this.router.navigate(['tela-novas-salas']);
  }

  public getSalaToEdit(): { sala: SalaModel; valid: boolean } {
    const sala = this.sessionService.getSessionData<SalaModel>('editsala');
    if (sala.valido) {
      sessionStorage.removeItem('editsala');
      return { valid: true, sala: sala.retorno };
    }
    return { valid: false, sala: {} as SalaModel };
  }
}
