import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  public createReservation(reserve: any) {
    this.http.post(url_config.url_reserve, reserve)
  }
}
