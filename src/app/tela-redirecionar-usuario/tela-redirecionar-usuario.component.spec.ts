/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaRedirecionarUsuarioComponent } from './tela-redirecionar-usuario.component';

describe('TelaRedirecionarUsuarioComponent', () => {
  let component: TelaRedirecionarUsuarioComponent;
  let fixture: ComponentFixture<TelaRedirecionarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaRedirecionarUsuarioComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaRedirecionarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
