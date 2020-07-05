import { IOrderEntry } from '@workspace/interfaces';
import { Component, OnInit } from '@angular/core';
import { CartFacade, ProductsFacade, OrdersFacade, CalculatorFacade } from '@workspace/core-data';
import { Router } from '@angular/router';
import { LoadMode } from '../../products/products/products.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  allCartEntries$ = this.cartFacade.allCartItems$;
  selectedOrderEntry$ = this.cartFacade.selectedOrderEntry$;
  allOrderEntries$ = this.cartFacade.allOrderEntries$;
  calculatorOutput$ = this.calculatorFacade.output$;
  constructor(
    private cartFacade:CartFacade,
    private productFacade:ProductsFacade,
    private orderFacade:OrdersFacade,
    private calculatorFacade:CalculatorFacade,
    private router:Router
  ) {
   }

  ngOnInit(): void {
    
  }
  onAddOrderEntry(quantity:number,orderEntry:IOrderEntry){
    orderEntry = {
      ...orderEntry,
      quantity
    }
    this.cartFacade.updateOrderEntry(orderEntry);
    this.cartFacade.unsetSelectedOrderEntry();
  }
  async onReadCodebar(codebar:string){
    try {
      await this.productFacade.readProductByCodebar(codebar);
      const product = await this.productFacade.selectedProductByCodebar$.toPromise();
      if(!product){
        throw new Error("Product Not Found");
      }
      if(!product.mainEntryId){
        throw new Error("Product has no main entry set");
      }
      this.cartFacade.addProductToCart(product);
    } catch (error) {
      console.error(error);
    }
  }
  onDeleteOrderEntry(id:string){
    this.cartFacade.removeProductFromCart(id);
  }
  onSearch(){
    this.router.navigate(["products"],{queryParams:{
      mode:LoadMode.SELECT
    }});
  }
  onCancelOrderEntry(){
    this.cartFacade.unsetSelectedOrderEntry();
  }
  async onCheckout(orderEntries:IOrderEntry[]){
    try {
      await this.orderFacade.addOrder(orderEntries);
      this.cartFacade.clearCart();
    } catch (error) {
      console.error(error);
    }
  }
  onCancelOrder(){
    this.cartFacade.clearCart();
  }
}
