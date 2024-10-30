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

  public carregarDadosProfessores() {
    return this.http.get<any[]>(url_config.url_professor);
  }

  public carregarDadosAlunos() {
    return this.http.get<any[]>(url_config.url_aluno);
  }

  public carregarDadosCursos() {
    return this.http.get<any[]>(url_config.url_curso);
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

  public carregarDadosDisciplinas() {
    return this.http.get<any[]>(url_config.url_disciplina);
  }

  adicionarNovaSala(novaSala: any) {
    return this.http.post<any[]>(url_config.url_sala, novaSala);
  }

  atualizarSala(salaAtualizada: any) {
    return this.http.patch<any[]>(url_config.url_sala, salaAtualizada);
  }

  public salvarSalaToEdit(matria: SalaModel) {
    this.sessionService.setItem('editSala', matria);
    this.router.navigate(['tela-novas-salas']);
  }

  public deletarSalas(salas: SalaModel[]) {
    const arrReqs: Observable<any>[] = [];
    salas.forEach((r) => {
      arrReqs.push(this.http.delete(`${url_config.url_sala}/${r.sala_id}`));
    });

    return forkJoin(...arrReqs);
  }
}
