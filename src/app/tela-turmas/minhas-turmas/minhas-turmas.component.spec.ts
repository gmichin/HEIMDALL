import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasTurmasComponent } from './minhas-turmas.component';

describe('MinhasTurmasComponent', () => {
  let component: MinhasTurmasComponent;
  let fixture: ComponentFixture<MinhasTurmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasTurmasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinhasTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
