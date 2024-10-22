import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { ReservaModel } from '../models/reserva.model';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  public createReservation(reserve: any): Observable<ReservaModel> {
    return this.http.post<ReservaModel>(url_config.url_reserva, reserve);
  }

  public findByClass(class_id: any): Observable<ReservaModel[]> {
    return this.http.get<ReservaModel[]>(
      `${url_config.url_reserva}/by-class/${class_id}`
    );
  }

  public deleteReserve(reservas: ReservaModel[]) {
    const arrReqs: Observable<any>[] = [];
    reservas.forEach((r) => {
      arrReqs.push(
        this.http.delete(`${url_config.url_reserva}/${r.reserva_id}`)
      );
    });

    return forkJoin(...arrReqs);
  }
}
