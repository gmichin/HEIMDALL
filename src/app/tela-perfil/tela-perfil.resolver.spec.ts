import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { telaPerfilResolver } from './tela-perfil.resolver';

describe('telaPerfilResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => telaPerfilResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
