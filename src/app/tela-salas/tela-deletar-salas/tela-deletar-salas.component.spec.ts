import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDeletarSalasComponent } from './tela-deletar-salas.component';

describe('TelaDeletarSalasComponent', () => {
  let component: TelaDeletarSalasComponent;
  let fixture: ComponentFixture<TelaDeletarSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaDeletarSalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaDeletarSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
