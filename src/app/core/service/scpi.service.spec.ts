import { TestBed } from '@angular/core/testing';

import { ScpiService } from './scpi.service';

describe('ScpiService', () => {
  let service: ScpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
