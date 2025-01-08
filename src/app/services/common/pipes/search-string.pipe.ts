import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchString'
})
export class SearchStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    debugger
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.name.toLocaleLowerCase().includes(args)) ||
       (value.state.toLocaleLowerCase().includes(args)) ||
       (value.portalregisterdate.toLocaleLowerCase().includes(args)) ;
    })

  }

}