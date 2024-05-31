import { TestBed } from '@angular/core/testing';

import { ElevateAttendeeService } from './elevate-attendee.service';

describe('PersonServiceService', () => {
  let service: ElevateAttendeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElevateAttendeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
