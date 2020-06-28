import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntryFormComponent } from './product-entry-form.component';

describe('ProductEntriesFormComponent', () => {
  let component: ProductEntryFormComponent;
  let fixture: ComponentFixture<ProductEntryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEntryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
