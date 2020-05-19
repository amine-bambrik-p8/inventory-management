import { TestBed } from '@angular/core/testing';

import { ProductEntriesService } from './product-entries.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductEntriesService', () => {
  let service: ProductEntriesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductEntriesService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('createOne',()=>{
    it.todo('should call http post with product id with data as body');
    it.todo('should have the product id included in the url');
  })
  describe('updateOne',()=>{
    it.todo('should call http put with product id and entry id and with data as body');
    it.todo('should have the product id and the entry id included in the url');
  });
  describe('deleteOne',()=>{
    it.todo('should call http delete with product id and entry id');
    it.todo('should have the product id and the entry id included in the url');
  })
});
