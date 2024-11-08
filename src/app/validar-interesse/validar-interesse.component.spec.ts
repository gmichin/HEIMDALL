import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarInteresseComponent } from './validar-interesse.component';

describe('ValidarInteresseComponent', () => {
  let component: ValidarInteresseComponent;
  let fixture: ComponentFixture<ValidarInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarInteresseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidarInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
