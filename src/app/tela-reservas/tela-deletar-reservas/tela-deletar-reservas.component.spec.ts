import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDeletarReservasComponent } from './tela-deletar-reservas.component';

describe('TelaDeletarReservasComponent', () => {
  let component: TelaDeletarReservasComponent;
  let fixture: ComponentFixture<TelaDeletarReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaDeletarReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaDeletarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
