import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaTurmasFeitasComponent } from './tela-turmas-feitas.component';

describe('TelaTurmasFeitasComponent', () => {
  let component: TelaTurmasFeitasComponent;
  let fixture: ComponentFixture<TelaTurmasFeitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaTurmasFeitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaTurmasFeitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
