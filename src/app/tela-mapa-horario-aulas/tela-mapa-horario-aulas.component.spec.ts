import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaMapaHorarioAulasComponent } from './tela-mapa-horario-aulas.component';

describe('TelaMapaHorarioAulasComponent', () => {
  let component: TelaMapaHorarioAulasComponent;
  let fixture: ComponentFixture<TelaMapaHorarioAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaMapaHorarioAulasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaMapaHorarioAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
