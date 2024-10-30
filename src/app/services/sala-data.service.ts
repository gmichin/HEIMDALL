import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { Observable } from 'rxjs/internal/Observable';
import { SalaModel } from '../models/sala.model';
import { forkJoin } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SalaDataService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) {}

  public carregarDadosAlunos() {
    return this.http.get<any[]>(url_config.url_aluno);
  }

  public carregarDadosTurma() {
    return this.http.get<any[]>(url_config.url_turma);
  }

  public carregarDadosReservasRequests() {
    return this.http.get<any[]>(url_config.url_validacao);
  }

  public carregarDadosSalasReservadas() {
    return this.http.get<any[]>(url_config.url_reserva);
  }
}
