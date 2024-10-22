import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSalasComponent } from './tela-disciplinas.component';

describe('TelaSalasComponent', () => {
  let component: TelaSalasComponent;
  let fixture: ComponentFixture<TelaSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaSalasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
