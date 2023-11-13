import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservasSubject = new BehaviorSubject<any[]>([]);
  reservas$ = this.reservasSubject.asObservable();

  reservarSala(sala: any) {
    const reservas = this.reservasSubject.getValue();
    reservas.push(sala);
    this.reservasSubject.next(reservas);
  }
}
