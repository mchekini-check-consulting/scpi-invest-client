import { TestBed } from '@angular/core/testing';

import { UserScpiService } from './user-scpi.service';

describe('UserScpiService', () => {
  let service: UserScpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserScpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
