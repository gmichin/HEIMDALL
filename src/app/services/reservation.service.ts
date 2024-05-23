import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_config } from '../url.config';
import { ReserveModel } from '../models/reserve.model';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  public createReservation(reserve: any): Observable<ReserveModel> {
    return this.http.post<ReserveModel>(url_config.url_reserve, reserve)
  }
  
  public findByClass(class_id: any): Observable<ReserveModel[]> {
    return this.http.get<ReserveModel[]>(`${url_config.url_reserve}/by-class/${class_id}`);
  }

  public deleteReserve(reservas: ReserveModel[]) {
    const arrReqs: Observable<any>[] = [];
    reservas.forEach(r => {
      arrReqs.push(this.http.delete(`${url_config.url_reserve}/${r._id}`));
    });

    return forkJoin(...arrReqs);
  }
}
