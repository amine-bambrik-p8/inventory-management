import { ISupplier } from '@workspace/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'workspace-supplier-grid-card',
  templateUrl: './supplier-grid-card.component.html',
  styleUrls: ['./supplier-grid-card.component.scss']
})
export class SupplierGridCardComponent implements OnInit {
  @Input()
  supplier: ISupplier;
  constructor() { }

  ngOnInit(): void {
  }

}
