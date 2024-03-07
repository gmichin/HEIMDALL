import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaHorarioComponent } from './tela-horario.component';

describe('TelaHorarioComponent', () => {
  let component: TelaHorarioComponent;
  let fixture: ComponentFixture<TelaHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
