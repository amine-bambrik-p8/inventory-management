import { Component, OnInit } from '@angular/core';
import { ProductsFacade } from '@workspace/core-data';
import { Router, ActivatedRoute} from '@angular/router';
import { IProduct } from '@workspace/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  selectedProduct$:Observable<IProduct> = this.productsFacade.selectedProduct$;
  constructor(
    private productsFacade: ProductsFacade,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      const id: string = this.activatedRoute.snapshot.paramMap.get("id");
      await this.productsFacade.readProduct(id);  
    } catch (error) {
      console.error(error);
    }
    
  }
  
  async onSubmit(product:IProduct): Promise<void>{
    try {
      await this.productsFacade.updateProduct(product);
      this.router.navigate(["/products"]);
    } catch (error) {
      console.error(error);
    }
  }

}
