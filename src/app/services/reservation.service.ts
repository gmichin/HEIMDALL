import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { IConsultaReserva, IReserva } from '../models/reserva.model';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  public createReservation(reserve: IReserva): Observable<IReserva> {
    return this.http.post<IReserva>(url_config.url_reserva, reserve);
  }
  public findSalaPorProfessorFilter(professor: any) {
    const urlWithParams = `${url_config.url_reserva}?professorId=${professor.professor_id}`;
    return this.http.get<IConsultaReserva[]>(urlWithParams);
  }

  public findSalaFilter(professor: any, turma_id: number) {
    const urlWithParams = `${url_config.url_reserva}?professorId=${professor.professor_id}&turmaId=${turma_id}`;

    return this.http.get<IConsultaReserva[]>(urlWithParams);
  }

  public findFilter(request: any) {
    const urlWithParams = `${url_config.url_reserva}?professorId=${request.professor.professor_id}&turmaId=${request.turma_id}&salaId=${request.sala}`;
    return this.http.get<IConsultaReserva[]>(urlWithParams);
  }

  public carregarDadosSalasReservadas() {
    return this.http.get<any[]>(url_config.url_reserva);
  }

  public atualizarReservas(reserva: any) {
    return this.http.patch<any[]>(
      `${url_config.url_reserva}/${reserva.reserva_id}`,
      reserva
    );
  }

  public apagarReservas(reserva: IReserva) {
    return this.http.delete<any[]>(
      `${url_config.url_reserva}/${reserva.reserva_id}`
    );
  }
}
