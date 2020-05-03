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
  describe('createOne',()=>{
    it('should call http post with product id with data as body');
    it('should have the product id included in the url');
  })
  describe('updateOne',()=>{
    it('should call http put with product id and entry id and with data as body');
    it('should have the product id and the entry id included in the url');
  });
  describe('deleteOne',()=>{
    it('should call http delete with product id and entry id');
    it('should have the product id and the entry id included in the url');
  })
});
