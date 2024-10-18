import { TestBed } from '@angular/core/testing';

import { StatScpiService } from './stat-scpi.service';

describe('StatScpiService', () => {
  let service: StatScpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatScpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
