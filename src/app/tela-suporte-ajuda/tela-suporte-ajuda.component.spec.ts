import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSuporteAjudaComponent } from './tela-suporte-ajuda.component';

describe('TelaSuporteAjudaComponent', () => {
  let component: TelaSuporteAjudaComponent;
  let fixture: ComponentFixture<TelaSuporteAjudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaSuporteAjudaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaSuporteAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
