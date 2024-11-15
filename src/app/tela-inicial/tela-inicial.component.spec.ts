import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaInicialComponent } from './tela-inicial.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

describe('TelaInicialComponent', () => {
  let component: TelaInicialComponent;
  let fixture: ComponentFixture<TelaInicialComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [TelaInicialComponent, TelaLoginCadastroComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [MatMenuModule],
      schemas: [NO_ERRORS_SCHEMA], // Para evitar erros com componentes filhos não testados
    });

    fixture = TestBed.createComponent(TelaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open login/signup dialog when openLoginSignUp is called', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of('result') });
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openLoginSignUp();

    expect(mockDialog.open).toHaveBeenCalledWith(TelaLoginCadastroComponent);
    dialogRefSpyObj.afterClosed().subscribe((result: any) => {
      expect(result).toBe('result');
    });
  });

  it('should navigate to tela-suporte-ajuda when openSuporteAjuda is called', () => {
    component.openSuporteAjuda();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['tela-suporte-ajuda']);
  });

  
});
