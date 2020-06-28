import { IProductEntry, IFilter, IProduct } from '@workspace/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductEntriesFacade } from '@workspace/core-data';
import { MatDialog } from '@angular/material/dialog';
import { ProductEntryFormComponent } from '@workspace/ui-components';

@Component({
  selector: 'workspace-product-entries-list',
  templateUrl: './product-entries-list.component.html',
  styleUrls: ['./product-entries-list.component.scss']
})
export class ProductEntriesListComponent implements OnInit {
  filters:IFilter[]=[
    {
      value:"quantity",
      name:"Quantity"
    }
  ];
  @Input()
  editable:boolean;
  @Input()
  product: IProduct;
  constructor(
    private entriesFacade:ProductEntriesFacade,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }
  async onHighlight(entry:IProductEntry){
    try {
      await this.entriesFacade.setProductMainEntry(this.product._id,entry);
    } catch (error) {
      console.error(error);
    }
  }
  onSubmitEntry(change?:IProductEntry){
    const id = this.product._id;
    const dialogRef = this.dialog.open(ProductEntryFormComponent,{
      data:change
    });

    dialogRef.afterClosed().subscribe(async (entry:IProductEntry) => {
      if(entry){
        try {
          if(change)
            return await this.entriesFacade.updateProductEntry(id,entry);
          await this.entriesFacade.addProductEntry(id,entry);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
  async onDeleteEntry(entry:IProductEntry){
    try {
      await this.entriesFacade.deleteProductEntry(this.product._id,entry);
    } catch (error) {
      console.error(error);
    }
  }
}
