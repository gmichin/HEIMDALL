import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { IReserva } from '../models/reserva.model';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  public createReservation(reserve: IReserva): Observable<IReserva> {
    return this.http.post<IReserva>(url_config.url_reserva, reserve);
  }

  public findByClass(class_id: any): Observable<IReserva[]> {
    return this.http.get<IReserva[]>(
      `${url_config.url_reserva}/by-class/${class_id}`
    );
  }

  public deleteReserve(reservas: IReserva[]) {
    const arrReqs: Observable<any>[] = [];
    reservas.forEach((r) => {
      arrReqs.push(
        this.http.delete(`${url_config.url_reserva}/${r.reserva_id}`)
      );
    });

    return forkJoin(...arrReqs);
  }

  public carregarDadosSalasReservadas() {
    return this.http.get<any[]>(url_config.url_reserva);
  }
}
