import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPermissaoSalasComponent } from './tela-permissao-salas.component';

describe('TelaPermissaoSalasComponent', () => {
  let component: TelaPermissaoSalasComponent;
  let fixture: ComponentFixture<TelaPermissaoSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaPermissaoSalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaPermissaoSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
