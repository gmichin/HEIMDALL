import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDisciplinasFeitasComponent } from './tela-disciplinas-feitas.component';

describe('TelaMateriasFeitasComponent', () => {
  let component: TelaDisciplinasFeitasComponent;
  let fixture: ComponentFixture<TelaDisciplinasFeitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaDisciplinasFeitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaDisciplinasFeitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
