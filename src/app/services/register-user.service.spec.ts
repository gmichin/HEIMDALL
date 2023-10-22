/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegisterUserService } from './register-user.service';

describe('Service: RegisterUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterUserService]
    });
  });

  it('should ...', inject([RegisterUserService], (service: RegisterUserService) => {
    expect(service).toBeTruthy();
  }));
});
