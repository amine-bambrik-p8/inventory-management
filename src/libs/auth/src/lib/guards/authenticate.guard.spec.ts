import { TestBed } from '@angular/core/testing';

import { AuthenticateGuard } from './authenticate.guard';

describe('AuthenticateGuard', () => {
  let guard: AuthenticateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  describe("canActivate",()=>{
    it("should return true when user is authenticated");
    it("should return false and navigate to /login when user is not authenticated");
    it("should return false and navigate to /login with url as queryParam when user is not authenticated");
  });
});
