import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNovasDisciplinasComponent } from './tela-novas-disciplinas.component';

describe('TelaNovasMateriasComponent', () => {
  let component: TelaNovasDisciplinasComponent;
  let fixture: ComponentFixture<TelaNovasDisciplinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaNovasDisciplinasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaNovasDisciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
