import { IProductEntry, IFilter } from '@workspace/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'workspace-product-entries-list',
  templateUrl: './product-entries-list.component.html',
  styleUrls: ['./product-entries-list.component.scss']
})
export class ProductEntriesListComponent implements OnInit {
  filters:IFilter[]=[
    {
      value:"quantity",
      name:"Quantity"
    }
  ];

  @Input()
  entries: IProductEntry[] = [];
  @Output()
  selectEntry:EventEmitter<IProductEntry> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  onSelectEntry(entry: IProductEntry){
    this.selectEntry.emit(entry);
  }

}
