import { TestBed } from '@angular/core/testing';

import { SuppliersService } from './suppliers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SuppliersService', () => {
  let service: SuppliersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(SuppliersService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
