import { TestBed } from '@angular/core/testing';

import { ElevateSchoolsService } from './elevate-schools.service';

describe('ElevateSchoolsService', () => {
  let service: ElevateSchoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElevateSchoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
