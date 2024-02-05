import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {
  private diasDesabilitadosSubject = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.carregarDiasDesabilitados();
  }

  diasDesabilitados$ = this.diasDesabilitadosSubject.asObservable();

  carregarDiasDesabilitados(): void {
    this.http.get<any>('/assets/jsons/feriados.json').subscribe(data => {
        this.sessionService.setItem('salas', data);
        this.diasDesabilitadosSubject.next(
          this.sessionService.getSessionData('salas').retorno as any[]
        );
      });
    }
}
