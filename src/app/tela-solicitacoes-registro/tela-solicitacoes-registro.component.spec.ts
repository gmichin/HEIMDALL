/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TelaSolicitacoesRegistroComponent } from './tela-solicitacoes-registro.component';

describe('TelaSolicitacoesRegistroComponent', () => {
  let component: TelaSolicitacoesRegistroComponent;
  let fixture: ComponentFixture<TelaSolicitacoesRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaSolicitacoesRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaSolicitacoesRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
