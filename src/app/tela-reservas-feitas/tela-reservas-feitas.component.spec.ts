import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaReservasFeitasComponent } from './tela-reservas-feitas.component';

describe('TelaReservasFeitasComponent', () => {
  let component: TelaReservasFeitasComponent;
  let fixture: ComponentFixture<TelaReservasFeitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaReservasFeitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaReservasFeitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
