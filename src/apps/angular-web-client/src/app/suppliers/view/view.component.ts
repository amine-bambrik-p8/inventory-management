import { Component, OnInit } from '@angular/core';
import { SuppliersFacade } from '@workspace/core-data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ISupplier } from '@workspace/interfaces';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  supplier$:Observable<ISupplier>;
  id:string;
  constructor(private suppliersFacade:SuppliersFacade,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.supplier$ = this.activatedRoute.paramMap.pipe(
      map((params:ParamMap)=>{
        this.id = params.get("id");
        return this.id;
      }),
      switchMap((id:string)=>{
        this.suppliersFacade.readSupplier(id);
        return this.suppliersFacade.selectedSupplier$;
      })
    );
  }

  onEdit(supplier:ISupplier){
    this.router.navigate(["suppliers",supplier._id,"edit"]);
  }

}
