import { TestBed } from '@angular/core/testing';

import { DataTransformInterceptor } from './data-transform.interceptor';

describe('DataTransformInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DataTransformInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DataTransformInterceptor = TestBed.inject(DataTransformInterceptor);
    expect(interceptor).toBeTruthy();
  });
  it('should transform the request.body to request.body.data');
  it('should transform the response.body to response.body.data');
  it('should not modify the response if it\'s not an HttpResponse');
});
