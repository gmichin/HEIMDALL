import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCalendarioComponent } from './tela-calendario.component';

describe('TelaCalendarioComponent', () => {
  let component: TelaCalendarioComponent;
  let fixture: ComponentFixture<TelaCalendarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaCalendarioComponent]
    });
    fixture = TestBed.createComponent(TelaCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
