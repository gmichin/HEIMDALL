import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class SalaDataService {
  private salaDataSubject = new BehaviorSubject<any[]>([]);
  private salasRequestDataSubject = new BehaviorSubject<any[]>([]);
  private teacherDataSubject = new BehaviorSubject<any[]>([]);
  private diasDesabilitadosSubject = new BehaviorSubject<any[]>([]);
  private salaReservaDataSubject = new BehaviorSubject<any[]>([]);
  private reservasRequestDataSubject = new BehaviorSubject<any[]>([]);

  private coursesDataSubject = new BehaviorSubject<any[]>([]);
  private classDataSubject = new BehaviorSubject<any[]>([]);


  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.carregarDadosSalas();
    this.carregarDadosProfessores();
    /* this.carregarDiasDesabilitados(); */
    this.carregarDadosSalasReservadas();
    /* this.carregarDadosReservasRequests();
    this.carregarDadosSalasRequests(); */
    this.carregarDadosCourses();
    this.carregarDadosClasses();
  }

  salaData$ = this.salaDataSubject.asObservable();
  salasRequestData$ = this.salasRequestDataSubject.asObservable();
  teacherData$ = this.teacherDataSubject.asObservable();
  diasDesabilitados$ = this.diasDesabilitadosSubject.asObservable();
  salaReservaData$ = this.salaReservaDataSubject.asObservable();
  reservasRequestData$ = this.reservasRequestDataSubject.asObservable();

  coursesData$ = this.coursesDataSubject.asObservable();
  classData$ = this.classDataSubject.asObservable();

  private carregarDadosClasses(){
    this.http.get<any[]>('http://52.232.204.226:3000/class').subscribe((data) => {
      this.sessionService.setItem('classes', data);
      this.classDataSubject.next(
        this.sessionService.getSessionData('classes').retorno as any[]
      );
    });
  }

  private carregarDadosCourses(){
    this.http.get<any[]>('http://52.232.204.226:3000/course').subscribe((data) => {
      this.sessionService.setItem('courses', data);
      this.coursesDataSubject.next(
        this.sessionService.getSessionData('courses').retorno as any[]
      );
    });
  }

  private carregarDadosReservasRequests() {
    this.http.get<any[]>('').subscribe((data) => {
      this.sessionService.setItem('reservas-request', data);
      this.reservasRequestDataSubject.next(
        this.sessionService.getSessionData('reservas-request').retorno as any[]
      );
    });
  }

  private carregarDadosSalasRequests() {
    this.http.get<any[]>('').subscribe((data) => {
      this.sessionService.setItem('salas-request', data);
      this.salasRequestDataSubject.next(
        this.sessionService.getSessionData('salas-request').retorno as any[]
      );
    });
  }

  /*/assets/jsons/reservas-sala.json*/
  private carregarDadosSalasReservadas() {
    this.http.get<any[]>('http://52.232.204.226:3000/reserve').subscribe((data) => {
      this.sessionService.setItem('reservas-sala', data);
      this.salaReservaDataSubject.next(
        this.sessionService.getSessionData('reservas-sala').retorno as any[]
      );
    });
  }

  carregarDiasDesabilitados(): void {
    this.http.get<any>('').subscribe(data => {
        this.sessionService.setItem('salas', data);
        this.diasDesabilitadosSubject.next(
          this.sessionService.getSessionData('salas').retorno as any[]
        );
    });
  }

  /*/assets/jsons/salas-cadastradas.json*/
  private carregarDadosSalas() {
    this.http.get<any[]>('http://52.232.204.226:3000/room').subscribe((data) => {
      this.sessionService.setItem('salas-cadastradas', data);
      this.salaDataSubject.next(
        this.sessionService.getSessionData('salas-cadastradas').retorno as any[]
      );
    });
  }
  /*/assets/jsons/professores-cadastrados.json*/
  private carregarDadosProfessores() {
    this.http.get<any[]>('http://52.232.204.226:3000/users').subscribe((data) => {
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
