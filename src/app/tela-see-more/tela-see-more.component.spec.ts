import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSeeMoreComponent } from './tela-see-more.component';

describe('TelaSeeMoreComponent', () => {
  let component: TelaSeeMoreComponent;
  let fixture: ComponentFixture<TelaSeeMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaSeeMoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
