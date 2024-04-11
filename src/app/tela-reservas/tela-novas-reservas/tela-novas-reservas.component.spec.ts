import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNovasReservasComponent } from './tela-novas-reservas.component';

describe('TelaNovasReservasComponent', () => {
  let component: TelaNovasReservasComponent;
  let fixture: ComponentFixture<TelaNovasReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaNovasReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaNovasReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
