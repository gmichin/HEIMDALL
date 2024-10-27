import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';

@Injectable({
  providedIn: 'root',
})
export class SalaDataService {
  constructor(private http: HttpClient) {}

  public carregarDadosSalas() {
    return this.http.get<any[]>(url_config.url_sala);
  }
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

  deletarSala(numero: number) {
    this.http.delete(url_config.url_sala);
  }
}
