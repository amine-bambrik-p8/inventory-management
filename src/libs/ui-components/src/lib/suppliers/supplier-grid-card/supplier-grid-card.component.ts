import { ISupplier } from '@workspace/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SuppliersFacade } from '@workspace/core-data';

@Component({
  selector: 'workspace-supplier-grid-card',
  templateUrl: './supplier-grid-card.component.html',
  styleUrls: ['./supplier-grid-card.component.scss']
})
export class SupplierGridCardComponent implements OnInit {
  @Input()
  supplier: ISupplier;
  constructor(private router:Router,private supplierFacade:SuppliersFacade) { }

  ngOnInit(): void {
  }
  onEdit(supplier: ISupplier){
    this.router.navigate(["suppliers",supplier._id,"edit"]);
  }
  onDelete(supplier: ISupplier){
    this.supplierFacade.deleteSupplier(supplier)
  }
}
