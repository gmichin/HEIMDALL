import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { telaRedirecionarUsuarioGuard } from './tela-redirecionar-usuario.guard';

describe('telaRedirecionarUsuarioGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => telaRedirecionarUsuarioGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
