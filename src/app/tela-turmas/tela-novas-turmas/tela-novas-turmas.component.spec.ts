import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNovasTurmasComponent } from './tela-novas-turmas.component';

describe('TelaNovasTurmasComponent', () => {
  let component: TelaNovasTurmasComponent;
  let fixture: ComponentFixture<TelaNovasTurmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaNovasTurmasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaNovasTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
