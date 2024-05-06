import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class SalaDataService {
  private salaDataSubject = new BehaviorSubject<any[]>([]);
  private teacherDataSubject = new BehaviorSubject<any[]>([]);
  private diasDesabilitadosSubject = new BehaviorSubject<any[]>([]);

  
  private salaReservaDataSubject = new BehaviorSubject<any[]>([]);
  private reservasRequestDataSubject = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.carregarDadosSalas();
    this.carregarDadosProfessores();
    this.carregarDiasDesabilitados();
    this.carregarDadosSalasReservadas();
    this.carregarDadosReservasRequests();
  }

  salaData$ = this.salaDataSubject.asObservable();
  teacherData$ = this.teacherDataSubject.asObservable();
  diasDesabilitados$ = this.diasDesabilitadosSubject.asObservable();


  salaReservaData$ = this.salaReservaDataSubject.asObservable();

  reservasRequestData$ = this.reservasRequestDataSubject.asObservable();

  private carregarDadosReservasRequests() {
    this.http.get<any[]>('/assets/jsons/reservas-request.json').subscribe((data) => {
      this.sessionService.setItem('reservas-request', data);
      this.reservasRequestDataSubject.next(
        this.sessionService.getSessionData('reservas-request').retorno as any[]
      );
    });
  }

  
  private carregarDadosSalasReservadas() {
    this.http.get<any[]>('/assets/jsons/reservas-sala.json').subscribe((data) => {
      this.sessionService.setItem('reservas-sala', data);
      this.salaReservaDataSubject.next(
        this.sessionService.getSessionData('reservas-sala').retorno as any[]
      );
    });
  }

  carregarDiasDesabilitados(): void {
    this.http.get<any>('/assets/jsons/feriados.json').subscribe(data => {
        this.sessionService.setItem('salas', data);
        this.diasDesabilitadosSubject.next(
          this.sessionService.getSessionData('salas').retorno as any[]
        );
    });
  }

  /* http://52.232.204.226:3000/room */
  private carregarDadosSalas() {
    this.http.get<any[]>('/assets/jsons/salas-cadastradas.json').subscribe((data) => {
      this.sessionService.setItem('salas-cadastradas', data);
      this.salaDataSubject.next(
        this.sessionService.getSessionData('salas-cadastradas').retorno as any[]
      );
    });
  }

  private carregarDadosProfessores() {
    this.http.get<any[]>('/assets/jsons/professores-cadastrados.json').subscribe((data) => {
      this.sessionService.setItem('professores', data);
      this.teacherDataSubject.next(
        this.sessionService.getSessionData('professores').retorno as any[]
      );
    });
  }

  adicionarNovaSala(novaSala: any) {
    const salasAtuais = this.salaDataSubject.getValue();
    this.salaDataSubject.next([...salasAtuais, novaSala]);
  }

  atualizarSala(salaAtualizada: any) {
    const salasAtuais = this.salaDataSubject.getValue();
    const indice = salasAtuais.findIndex(
      (sala) => sala.numero === salaAtualizada.numero
    );

    if (indice !== -1) {
      const salasAtualizadas = [...salasAtuais];
      salasAtualizadas[indice] = salaAtualizada;
      this.salaDataSubject.next(salasAtualizadas);
    }
  }

  obterDetalhesSala(numero: number): any {
    const salas = this.salaDataSubject.getValue();
    return salas.find((sala) => sala.numero === numero);
  }

  deletarSala(numero: number) {
    const salasAtuais = this.salaDataSubject.getValue();
    const salasAtualizadas = salasAtuais.filter(
      (sala) => sala.numero !== numero
    );
    this.salaDataSubject.next(salasAtualizadas);
  }
}
