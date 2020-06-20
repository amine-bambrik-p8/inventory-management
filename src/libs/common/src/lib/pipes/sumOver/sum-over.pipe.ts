import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumOver'
})
export class SumOverPipe implements PipeTransform {

  transform(array: any[], field:string): unknown {
    return array.reduce((currSum,object)=>currSum+object[field],0);
  }

}
