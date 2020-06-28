import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProductEntry } from '@workspace/interfaces';

@Component({
  selector: 'workspace-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.scss']
})
export class ProductEntryComponent implements OnInit {
  @Input()
  entry:IProductEntry;
  @Input()
  highlight:boolean;
  @Input()
  editable:boolean
  @Output()
  edit:EventEmitter<IProductEntry> = new EventEmitter();
  @Output()
  delete:EventEmitter<IProductEntry> = new EventEmitter();
  @Output()
  entryHightlight:EventEmitter<IProductEntry> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
