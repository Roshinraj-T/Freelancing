import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitOnly'
})
export class DigitOnlyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    return value.replace(/\D/g, ''); // Replace all non-digit characters with an empty string
  }
}
