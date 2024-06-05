import { TestBed } from '@angular/core/testing';

import { ElevateAttendanceService } from './elevate-attendance.service';

describe('ElevateAttendanceService', () => {
  let service: ElevateAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElevateAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
