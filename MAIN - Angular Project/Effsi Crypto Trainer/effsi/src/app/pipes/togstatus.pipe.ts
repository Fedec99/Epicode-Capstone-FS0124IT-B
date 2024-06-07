import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'togstatus'
})
export class TogstatusPipe implements PipeTransform {

  transform(value: boolean) {
    if (value) {
      return '#167a4c';
    } else {
      return 'red';
    }
  }

}
