import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SalaDataService {
  private salaDataSubject = new BehaviorSubject<any[]>([]);
  salaData$ = this.salaDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarDadosSalas();
  }

  private carregarDadosSalas() {
    this.http.get<any[]>('/assets/jsons/sala.json').subscribe(data => {
      this.salaDataSubject.next(data);
    });
  }

  adicionarNovaSala(novaSala: any) {
    const salasAtuais = this.salaDataSubject.getValue();
    this.salaDataSubject.next([...salasAtuais, novaSala]);
  }

  obterDetalhesSala(numero: number): any {
    const salas = this.salaDataSubject.getValue();
    return salas.find(sala => sala.numero === numero);
  }
}