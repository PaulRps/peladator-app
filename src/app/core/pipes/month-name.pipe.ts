import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
})
export class MonthNamePipe extends DatePipe implements PipeTransform {
  override transform(value: any, args?: any): any {
    const month = Number(value);
    return monthNames.find((m, index) => index + 1 == month);
  }
}

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];


