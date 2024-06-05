import { TestBed } from '@angular/core/testing';

import { IsoDateFormatterService } from './iso-date-formatter.service';

describe('IsoDateFormatterService', () => {
  let service: IsoDateFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsoDateFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
