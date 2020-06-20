import { Component, OnInit, Input } from '@angular/core';
import { ISupplier } from '@workspace/interfaces';

@Component({
  selector: 'workspace-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.scss']
})
export class SupplierInfoComponent implements OnInit {
  
  @Input()
  supplier:ISupplier;
  constructor() { }

  ngOnInit(): void {
  }

}
