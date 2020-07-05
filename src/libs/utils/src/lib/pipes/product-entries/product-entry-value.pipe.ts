import { Pipe, PipeTransform } from '@angular/core';
import { IProductEntry } from '@workspace/interfaces';

@Pipe({
  name: 'productEntryValue'
})
export class ProductEntryValuePipe implements PipeTransform {

  transform(entry: IProductEntry, ...args: any[]): unknown {
    const value = entry.price * (1-entry.discount) * entry.quantity
    return value;
  }

}
