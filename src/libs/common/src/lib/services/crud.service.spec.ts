import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';

describe('CrudService', () => {
  let service: CrudService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('createOne',()=>{
    it('should call http post method with the passed data as body')
    it('should use the base url');
  })
  describe('readOne',()=>{
    it('should call http get method with the passed id');
    it('should have the id included in the url');
  });
  describe('readMany',()=>{
    it('should call http get method with the passed filter as query');
  });
  describe('updateOne',()=>{
    it('should call http put method with the passed id. and data as body');
    it('should have the id included in the url');
  });
  describe('deleteOne',()=>{
    it('should call http delete method with the passed id');
    it('should have the id included in the url');
  });
});
