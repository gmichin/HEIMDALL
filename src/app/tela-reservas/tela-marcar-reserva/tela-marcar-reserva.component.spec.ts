import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaMarcarReservaComponent } from './tela-marcar-reserva.component';

describe('TelaMarcarReservaComponent', () => {
  let component: TelaMarcarReservaComponent;
  let fixture: ComponentFixture<TelaMarcarReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaMarcarReservaComponent]
    });
    fixture = TestBed.createComponent(TelaMarcarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
