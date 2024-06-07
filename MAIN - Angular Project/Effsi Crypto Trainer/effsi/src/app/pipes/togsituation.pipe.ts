import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Pipe({
  name: 'togsituation'
})
export class TogsituationPipe implements PipeTransform {


  transform(todos: Todo[], ) {
    let tot = todos.length;
    let completed = todos.filter(todo => todo.status == true).length;
    if (tot != completed) {
      let percent = (completed * 100)/tot;
      return `${Math.round(percent)}%`
    } else {
      return '100%';
    }
  }

}
