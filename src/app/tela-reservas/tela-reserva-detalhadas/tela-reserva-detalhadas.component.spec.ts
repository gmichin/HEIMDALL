import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaReservaDetalhadasComponent } from './tela-reserva-detalhadas.component';

describe('TelaReservaDetalhadasComponent', () => {
  let component: TelaReservaDetalhadasComponent;
  let fixture: ComponentFixture<TelaReservaDetalhadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaReservaDetalhadasComponent]
    });
    fixture = TestBed.createComponent(TelaReservaDetalhadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
