import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaReservasComponent } from './tela-reservas.component';

describe('TelaReservasComponent', () => {
  let component: TelaReservasComponent;
  let fixture: ComponentFixture<TelaReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaReservasComponent]
    });
    fixture = TestBed.createComponent(TelaReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
