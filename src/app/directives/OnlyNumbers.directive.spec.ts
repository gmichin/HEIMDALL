import { PhoneNumberDirective } from './OnlyNumbers.directive'
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

@Component({
  template: `<input appPhoneNumber />`,
})
class TestComponent {}

describe('PhoneNumberDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneNumberDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('should format the phone number as (XX) XXXXX-XXXX', () => {
    // Simulando o evento de input com um valor de telefone
    inputElement.value = '1234567890';
    inputElement.dispatchEvent(new Event('input'));

    // Acionando a detecção de mudanças
    fixture.detectChanges();

    // Verificando se a formatação foi aplicada corretamente
    expect(inputElement.value).toBe('(12) 34567-890');
  });

  it('should allow input less than 2 digits without formatting', () => {
    inputElement.value = '1';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('(1');
  });

  it('should correctly format when digits are added progressively', () => {
    inputElement.value = '12';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('(12');

    inputElement.value = '123456';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('(12) 3456');

    inputElement.value = '1234567890';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('(12) 34567-890');
  });

  it('should limit the length of the input to 15 characters', () => {
    inputElement.value = '123456789012345';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('');
  });
});
