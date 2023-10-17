import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const initialValue = event.target.value;
    const regex = /^[0-9]*$/;

    if (!regex.test(initialValue)) {
      event.target.value = initialValue.replace(/[^0-9]*/g, '');
    }
  }
}
