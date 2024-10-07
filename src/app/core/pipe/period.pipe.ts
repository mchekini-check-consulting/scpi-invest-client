import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'period',
  standalone: true
})
export class PeriodPipe implements PipeTransform {

  transform(value: number): string {

    let years_str = '';
    let months_str = '';
    let and_str = ' ';
    let years;

    // months
    months_str = value % 12 !== 0 ? value% 12 + ' mois' : '';

    // years
    years = (value / 12);
    if(years === 1) {
      years_str = (years | 0) + ' an';
    }
    else if (years > 1){
      years_str = (years | 0) + ' ans';
    }

    if(years_str !== '' && months_str !== '')
      and_str = ' et ';

    return years_str + and_str + months_str;
  }
}

