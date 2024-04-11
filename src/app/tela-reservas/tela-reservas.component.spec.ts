import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaReservasComponent } from './tela-reservas.component';

describe('TelaReservasComponent', () => {
  let component: TelaReservasComponent;
  let fixture: ComponentFixture<TelaReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
