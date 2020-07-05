import { Pipe, PipeTransform } from '@angular/core';
import { IProduct, IProductEntry } from '@workspace/interfaces';

@Pipe({
  name: 'productMainEntry'
})
export class ProductMainEntryPipe implements PipeTransform {

  transform(product: IProduct, ...args: unknown[]): IProductEntry {
    return product.entries.find(entry=>entry._id === product.mainEntryId);
  }

}
