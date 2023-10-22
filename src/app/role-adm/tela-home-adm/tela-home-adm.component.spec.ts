/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TelaHomeAdmComponent } from './tela-home-adm.component';

describe('TelaHomeAdmComponent', () => {
  let component: TelaHomeAdmComponent;
  let fixture: ComponentFixture<TelaHomeAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaHomeAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaHomeAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
