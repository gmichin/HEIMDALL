import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSalasFeitasComponent } from './tela-materias-feitas.component';

describe('TelaSalasFeitasComponent', () => {
  let component: TelaSalasFeitasComponent;
  let fixture: ComponentFixture<TelaSalasFeitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaSalasFeitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaSalasFeitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
