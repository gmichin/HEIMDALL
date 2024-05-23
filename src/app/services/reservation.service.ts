import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { ReserveModel } from '../models/reserve.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  public createReservation(reserve: any): Observable<ReserveModel> {
    return this.http.post<ReserveModel>(url_config.url_reserve, reserve)
  }
}
