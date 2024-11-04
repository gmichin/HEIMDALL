import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaTurmasComponent } from './tela-turmas.component';

describe('TelaTurmasComponent', () => {
  let component: TelaTurmasComponent;
  let fixture: ComponentFixture<TelaTurmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaTurmasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
