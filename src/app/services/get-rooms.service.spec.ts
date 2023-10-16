/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetRoomsService } from './get-rooms.service';

describe('Service: GetRooms', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRoomsService]
    });
  });

  it('should ...', inject([GetRoomsService], (service: GetRoomsService) => {
    expect(service).toBeTruthy();
  }));
});
