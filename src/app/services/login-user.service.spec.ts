/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginUserService } from './login-user.service';

describe('Service: LoginUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginUserService]
    });
  });

  it('should ...', inject([LoginUserService], (service: LoginUserService) => {
    expect(service).toBeTruthy();
  }));
});
