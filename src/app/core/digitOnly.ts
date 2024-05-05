import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitsOnly]',
})
export class DigitsOnlyDirective {
    @HostListener('keypress', ['$event']) // Listen for keypress events
    onKeyPress(event: KeyboardEvent) {
      const allowedKeys = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']); // Set of allowed keys
      const key = event.key; // Use the 'key' property
      if (!allowedKeys.has(key)) { // Check if the key is not in the allowed set
        event.preventDefault(); // Prevent non-digit input
      }
    }
  
}