import { ISupplier } from '@workspace/interfaces';
import { Observable } from 'rxjs';
import { SuppliersFacade } from '@workspace/core-data';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  suppliers$:Observable<ISupplier[]> = this.suppliers.allSuppliers$;
  constructor(private suppliers:SuppliersFacade,private router:Router) { }

  ngOnInit(): void {
    this.suppliers.loadSuppliers();
  }
  onAdd(){
    this.router.navigate(["suppliers","add"])
  }

  onView(supplier:ISupplier){
    this.router.navigate(["suppliers",supplier._id]);
  }

}
