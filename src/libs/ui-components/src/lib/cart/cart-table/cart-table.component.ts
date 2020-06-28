import { Component, OnInit, Input, EventEmitter, Output, ContentChild } from '@angular/core';
import { ICartItem } from '@workspace/interfaces';
import { CartFacade } from '@workspace/core-data'
@Component({
  selector: 'workspace-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  @Input()
  entries:ICartItem[];
  @Input()
  set actions(value:boolean){
    if(value){
      this.displayedColumns.push("action")
    }
    this.editable = value;
  }
  
  @Output()
  codebarEntered:EventEmitter<string> = new EventEmitter<string>();
  @Output()
  search:EventEmitter<string> = new EventEmitter();
  
  displayedColumns: string[] = ['product', 'quantity', 'unit', 'unit-price','discount','sub-total'];
  editable:boolean;
  constructor(private cartFacade:CartFacade) { }
  ngOnInit(): void {
  }
  onEdit(item:ICartItem): void{
    this.cartFacade.setSelectedOrderEntry(item._id);
  }
  onDelete(item:ICartItem): void{
    this.cartFacade.removeProductFromCart(item._id);
  }
  get total():number{
    return this.entries.reduce((sum,curr)=>sum+curr.price*(1-curr.discount)*curr.quantity,0) || 0;
  }
}
