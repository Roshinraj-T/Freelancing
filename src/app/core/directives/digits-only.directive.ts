import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitsOnly]'
})
export class DigitsOnlyDirective {

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const allowedKeys = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']); // Allowed digit keys
    if (!allowedKeys.has(event.key)) {
      event.preventDefault(); // Prevent non-digit inputs
    }
  }
}
