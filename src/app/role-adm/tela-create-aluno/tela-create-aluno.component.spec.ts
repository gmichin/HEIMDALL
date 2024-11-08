/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TelaCreateAlunoComponent } from './tela-create-aluno.component';

describe('TelaCreateAdmComponent', () => {
  let component: TelaCreateAlunoComponent;
  let fixture: ComponentFixture<TelaCreateAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaCreateAlunoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaCreateAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
