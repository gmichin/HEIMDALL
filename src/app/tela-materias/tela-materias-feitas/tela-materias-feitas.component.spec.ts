import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaMateriasFeitasComponent } from './tela-materias-feitas.component';

describe('TelaMateriasFeitasComponent', () => {
  let component: TelaMateriasFeitasComponent;
  let fixture: ComponentFixture<TelaMateriasFeitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaMateriasFeitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaMateriasFeitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
