import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '@workspace/interfaces';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsFacade } from '@workspace/core-data';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  product$:Observable<IProduct>;
  id:string;
  constructor(private productsFacade:ProductsFacade,private activatedRoute:ActivatedRoute,private router:Router) {}
  ngOnInit(): void {
    this.product$ = this.activatedRoute.paramMap.pipe(
      map((params:ParamMap)=>{
        this.id = params.get("id");
        return this.id;
      }),
      switchMap((id:string)=>{
        this.productsFacade.readProduct(id);
        return this.productsFacade.selectedProduct$;
      })
    );
  }
  onEdit(product:IProduct){
    this.router.navigate(["products",product._id,"edit"]);
  }

}
