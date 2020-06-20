import { Component, OnInit } from '@angular/core';
import { SuppliersFacade } from '@workspace/core-data';
import { Router, ActivatedRoute, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ISupplier } from '@workspace/interfaces';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  selectedSupplier$:Observable<ISupplier> = this.suppliersFacade.selectedSupplier$;
  constructor(
    private suppliersFacade:SuppliersFacade,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    try {
      const id = this.activatedRoute.snapshot.paramMap.get("id");
      this.suppliersFacade.readSupplier(id);
    } catch (error) {
      console.error(error);
    }
  }

  onEdit(supplier:ISupplier){
    this.router.navigate(["suppliers",supplier._id,"edit"]);
  }

}
