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

  public findFilter(request: any) {
    const queryParams = this.objectToQueryParams(request);
    const urlWithParams = `${url_config.url_reserva}?${queryParams}`;
    
    return this.http.get<IConsultaReserva[]>(urlWithParams);
  }
  
  private objectToQueryParams(obj: any): string {
    return Object.keys(obj)
      .filter(key => obj[key] !== null && obj[key] !== undefined)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }
  
}
