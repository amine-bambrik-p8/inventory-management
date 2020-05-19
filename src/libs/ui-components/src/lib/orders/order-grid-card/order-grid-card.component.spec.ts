import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGridCardComponent } from './order-grid-card.component';

describe('OrderGridCardComponent', () => {
  let component: OrderGridCardComponent;
  let fixture: ComponentFixture<OrderGridCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGridCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
