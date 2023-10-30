/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InternsService } from './interns.service';

describe('Service: Interns', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternsService]
    });
  });

  it('should ...', inject([InternsService], (service: InternsService) => {
    expect(service).toBeTruthy();
  }));
});
