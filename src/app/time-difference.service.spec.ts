import { TestBed } from '@angular/core/testing';

import { TimeDifferenceService } from './time-difference.service';

describe('TimeDifferenceService', () => {
  let service: TimeDifferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeDifferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
