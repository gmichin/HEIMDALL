/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResgistrationRequestsService } from './resgistration-requests.service';

describe('Service: ResgistrationRequests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResgistrationRequestsService]
    });
  });

  it('should ...', inject([ResgistrationRequestsService], (service: ResgistrationRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
