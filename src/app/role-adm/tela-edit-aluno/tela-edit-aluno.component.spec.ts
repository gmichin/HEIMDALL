/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TelaEditAlunoComponent } from './tela-edit-aluno.component';

describe('TelaEditAdmComponent', () => {
  let component: TelaEditAlunoComponent;
  let fixture: ComponentFixture<TelaEditAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaEditAlunoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaEditAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
