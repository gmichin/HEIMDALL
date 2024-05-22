import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { SessionService } from './session.service';
import { url_config } from '../url.config';

@Injectable({
  providedIn: 'root',
})
export class SalaDataService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  public carregarDadosClasses(){
    return this.http.get<any[]>(url_config.url_class);
  }

  public carregarDadosCourses(){
    return this.http.get<any[]>(url_config.url_course);
  }

  public carregarDadosReservasRequests() {
    return this.http.get<any[]>('')
  }

  public carregarDadosSalasRequests() {
    return this.http.get<any[]>('');
  }

  public carregarDadosSalasReservadas() {
    return this.http.get<any[]>(url_config.url_reserve);
  }

  carregarDiasDesabilitados() {
    return this.http.get<any>('');
  }

  public carregarDadosSalas() {
    return this.http.get<any[]>(url_config.url_room)
  }

  adicionarNovaSala(novaSala: any) {
    return this.http.post<any[]>(url_config.url_room, novaSala);
  }
  
  atualizarSala(salaAtualizada: any) {
    return this.http.patch<any[]>(url_config.url_room, salaAtualizada);
  }

  deletarSala(numero: number) {
    this.http.delete(url_config.url_room)
  }
}
