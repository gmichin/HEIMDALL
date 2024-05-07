import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNovasSalasComponent } from './tela-novas-salas.component';

describe('TelaNovasSalasComponent', () => {
  let component: TelaNovasSalasComponent;
  let fixture: ComponentFixture<TelaNovasSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaNovasSalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaNovasSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
