import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacaoProfessoresComponent } from './validacao-professores.component';

describe('ValidacaoProfessoresComponent', () => {
  let component: ValidacaoProfessoresComponent;
  let fixture: ComponentFixture<ValidacaoProfessoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacaoProfessoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidacaoProfessoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
