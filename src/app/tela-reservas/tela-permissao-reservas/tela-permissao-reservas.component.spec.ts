import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPermissaoReservasComponent } from './tela-permissao-reservas.component';

describe('TelaPermissaoReservasComponent', () => {
  let component: TelaPermissaoReservasComponent;
  let fixture: ComponentFixture<TelaPermissaoReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaPermissaoReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaPermissaoReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
