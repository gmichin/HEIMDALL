/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NovaSalaModalComponent } from './nova-sala-modal.component';

describe('NovaSalaModalComponent', () => {
  let component: NovaSalaModalComponent;
  let fixture: ComponentFixture<NovaSalaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaSalaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSalaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
