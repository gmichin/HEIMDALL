import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNovasMateriasComponent } from './tela-novas-disciplinas.component';

describe('TelaNovasMateriasComponent', () => {
  let component: TelaNovasMateriasComponent;
  let fixture: ComponentFixture<TelaNovasMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaNovasMateriasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaNovasMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
