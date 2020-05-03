import { TestBed } from '@angular/core/testing';

import { JwtAuthService } from './jwt-auth.service';

describe('JwtAuthService', () => {
  let service: JwtAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe("isAuthenticated$",()=>{
    it("should return false when there's no token");
    it("should return false when the token expires");
    it("should return false when the token expires");
  })
});
