import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneNumber]',
})
export class PhoneNumberDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    const initialValue = event.target.value;
    let formattedValue = '';
    const numbersOnly = initialValue.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (numbersOnly.length <= 2 && numbersOnly !== '') {
      formattedValue = `(${numbersOnly}`;
    } else if (numbersOnly.length <= 7) {
      formattedValue = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2)}`;
    } else if (numbersOnly.length <= 11) {
      formattedValue = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(
        2,
        7
      )}-${numbersOnly.slice(7)}`;
    }
    event.target.value = formattedValue.substring(0, 15); // Limite o tamanho má
  }
}
