import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brazilianMoney',
})
export class BrazilianMoneyPipe implements PipeTransform {
  transform(value: number): string {
    return this.formatValue(value);
  }

  private formatValue(value: number): string {
    const currency = 'R$';
    const decimalSeparator = ',';
    const thousandSeparator = '.';
    const precision = 2;

    const formattedValue = value.toFixed(precision);
    const parts = formattedValue.split('.');
    const integerPart = parts[0];
    const fractionalPart = parts[1];

    const formattedIntegerPart = this.formatIntegerPart(integerPart, thousandSeparator);
    const formattedFractionalPart = fractionalPart.padEnd(precision, '0');

    return `${currency} ${formattedIntegerPart}${decimalSeparator}${formattedFractionalPart}`;
  }

  private formatIntegerPart(value: string, separator: string): string {
    const parts = value.split('');
    const formattedParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      formattedParts.push(parts[i]);
      if ((parts.length - i) % 3 === 0 && i !== 0) {
        formattedParts.push(separator);
      }
    }

    return formattedParts.reverse().join('');
  }
}
