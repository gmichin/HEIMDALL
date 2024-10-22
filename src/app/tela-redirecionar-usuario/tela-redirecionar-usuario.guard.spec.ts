import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { RedirecionarUsuarioGuard } from './tela-redirecionar-usuario.guard';

describe('RedirecionarUsuarioGuard', () => {
  let guard: RedirecionarUsuarioGuard;
  let sessionService: jasmine.SpyObj<SessionService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const sessionServiceSpy = jasmine.createSpyObj('SessionService', [
      'getSessionData',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        RedirecionarUsuarioGuard,
        { provide: SessionService, useValue: sessionServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(RedirecionarUsuarioGuard);
    sessionService = TestBed.inject(
      SessionService
    ) as jasmine.SpyObj<SessionService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
