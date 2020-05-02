import { TestBed } from '@angular/core/testing';

import { ProductEntriesService } from './product-entries.service';

describe('ProductEntriesService', () => {
  let service: ProductEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
