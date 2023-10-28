import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  public getSessionData<R>(key: string): { retorno: R; valido: boolean } {
    const valorSalvo = sessionStorage.getItem(key);
    if (valorSalvo) {
      return {
        retorno: JSON.parse(valorSalvo),
        valido: true,
      };
    }
    return {
      retorno: <R>{},
      valido: false,
    };
  }

  public setItem(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}
