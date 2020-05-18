import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierGridCardComponent } from './supplier-grid-card.component';

describe('SupplierGridCardComponent', () => {
  let component: SupplierGridCardComponent;
  let fixture: ComponentFixture<SupplierGridCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierGridCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
