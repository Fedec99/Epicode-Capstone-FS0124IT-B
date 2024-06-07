import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'togpercent'
})
export class TogpercentPipe implements PipeTransform {

  transform(value: number) {
    if (value < 0) {
      return 'red';
    } else if (value > 0) {
      return '#167a4c';
    } else {
      return 'grey';
    }
  }

}
