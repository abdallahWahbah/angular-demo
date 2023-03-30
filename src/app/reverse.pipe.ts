import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any, max: number): any {
    // return value.split("").reverse().join("")
    return value.split("").slice(1, max).join("")
  }

}
