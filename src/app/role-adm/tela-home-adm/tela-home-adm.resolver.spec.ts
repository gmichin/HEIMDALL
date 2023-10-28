import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { telaHomeAdmResolver } from './tela-home-adm.resolver';

describe('telaHomeAdmResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => telaHomeAdmResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
