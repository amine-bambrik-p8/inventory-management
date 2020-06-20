import { Component, OnInit } from '@angular/core';
import { SuppliersFacade } from '@workspace/core-data';
import { Router, ActivatedRoute, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { ISupplier } from '@workspace/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  selectedSupplier$ = this.suppliersFacade.selectedSupplier$;
  constructor(private suppliersFacade:SuppliersFacade,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
    
    
  }
  private async loadData() {
    try {
      const id = this.activatedRoute.snapshot.paramMap.get("id");
      await this.suppliersFacade.readSupplier(id);
    } catch (error) {
      console.error(error);
    }
  }

  async onSubmit(supplier:ISupplier):Promise<void>{
    try {
      await this.suppliersFacade.updateSupplier(supplier);
      this.router.navigate(["suppliers"]);
    } catch (error) {
      console.error(error);
    }
  }
}
