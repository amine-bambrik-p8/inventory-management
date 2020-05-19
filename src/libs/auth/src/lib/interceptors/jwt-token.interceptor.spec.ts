import { TestBed } from '@angular/core/testing';

import { JwtTokenInterceptor } from './jwt-token.interceptor';

describe('JwtTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtTokenInterceptor = TestBed.inject(JwtTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
  it('should add Authorization header');
  it('should not add Authorization header when url is not our domain');
  it('should not add Authorization header when no token is available');
});
