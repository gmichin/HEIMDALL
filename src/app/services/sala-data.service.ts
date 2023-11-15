import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SalaDataService {
  private salaDataSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.carregarDadosSalas();
  }

  salaData$ = this.salaDataSubject.asObservable();


  private carregarDadosSalas() {
    this.http.get<any[]>('/assets/jsons/sala.json').subscribe(data => {
      this.salaDataSubject.next(data);
    });
  }

  adicionarNovaSala(novaSala: any) {
    const salasAtuais = this.salaDataSubject.getValue();
    this.salaDataSubject.next([...salasAtuais, novaSala]);
  }

  atualizarSala(salaAtualizada: any) {
    const salasAtuais = this.salaDataSubject.getValue();
    const indice = salasAtuais.findIndex(sala => sala.numero === salaAtualizada.numero);

    if (indice !== -1) {
      const salasAtualizadas = [...salasAtuais];
      salasAtualizadas[indice] = salaAtualizada;
      this.salaDataSubject.next(salasAtualizadas);
    }
  }

  obterDetalhesSala(numero: number): any {
    const salas = this.salaDataSubject.getValue();
    return salas.find(sala => sala.numero === numero);
  }
}
