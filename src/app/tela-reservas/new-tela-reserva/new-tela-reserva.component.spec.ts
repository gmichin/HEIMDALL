import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTelaReservaComponent } from './new-tela-reserva.component';

describe('NewTelaReservaComponent', () => {
  let component: NewTelaReservaComponent;
  let fixture: ComponentFixture<NewTelaReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTelaReservaComponent]
    });
    fixture = TestBed.createComponent(NewTelaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
