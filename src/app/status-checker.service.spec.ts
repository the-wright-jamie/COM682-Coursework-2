import { TestBed } from '@angular/core/testing';

import { StatusCheckerService } from './status-checker.service';

describe('StatusCheckerService', () => {
  let service: StatusCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
