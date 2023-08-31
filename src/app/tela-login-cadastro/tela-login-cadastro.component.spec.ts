import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaLoginCadastroComponent } from './tela-login-cadastro.component';

describe('TelaLoginComponent', () => {
  let component: TelaLoginCadastroComponent;
  let fixture: ComponentFixture<TelaLoginCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelaLoginCadastroComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TelaLoginCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
