import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCadastroComponent } from './tela-cadastro.component';

describe('TelaCadastroComponent', () => {
  let component: TelaCadastroComponent;
  let fixture: ComponentFixture<TelaCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaCadastroComponent]
    });
    fixture = TestBed.createComponent(TelaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
