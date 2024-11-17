import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AnimacaoComponent } from './animacao.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AnimacaoComponent', () => {
  let component: AnimacaoComponent;
  let fixture: ComponentFixture<AnimacaoComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimacaoComponent],
      imports: [RouterTestingModule],
      providers: [{
        provide: Router, useValue: {
          navigate: () => {}
        }
      }] // Para simular o roteamento
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimacaoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('deve alternar exibições e navegar após 8 segundos', fakeAsync(() => {
    const spy = spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();

    // Aqui, simula o avanço do tempo para o comportamento assíncrono
    tick(8000); // Avança 8 segundos

    expect(spy).toHaveBeenCalled();
  }));
});
