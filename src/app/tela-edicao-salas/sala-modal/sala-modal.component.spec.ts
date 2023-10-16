/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalaModalComponent } from './sala-modal.component';

describe('SalaModalComponent', () => {
  let component: SalaModalComponent;
  let fixture: ComponentFixture<SalaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
