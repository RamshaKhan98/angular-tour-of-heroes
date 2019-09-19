import { TestBed } from '@angular/core/testing';

import { HeropowerService } from './heropower.service';

describe('HeropowerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeropowerService = TestBed.get(HeropowerService);
    expect(service).toBeTruthy();
  });
});
