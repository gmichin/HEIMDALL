import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarInteresseComponent } from './solicitar-interesse.component';

describe('SolicitarInteresseComponent', () => {
  let component: SolicitarInteresseComponent;
  let fixture: ComponentFixture<SolicitarInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarInteresseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
