/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TelaEdicaoSalasComponent } from './tela-edicao-salas.component';

describe('TelaEdicaoSalasComponent', () => {
  let component: TelaEdicaoSalasComponent;
  let fixture: ComponentFixture<TelaEdicaoSalasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaEdicaoSalasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaEdicaoSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
