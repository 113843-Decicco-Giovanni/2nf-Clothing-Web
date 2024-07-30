import { TestBed } from '@angular/core/testing';

import { DevolutionService } from './devolution.service';

describe('DevolutionService', () => {
  let service: DevolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
