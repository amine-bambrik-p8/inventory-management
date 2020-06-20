import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntriesListComponent } from './product-entries-list.component';

describe('ProductEntriesListComponent', () => {
  let component: ProductEntriesListComponent;
  let fixture: ComponentFixture<ProductEntriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEntriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEntriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
