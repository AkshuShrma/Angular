import { TestBed } from '@angular/core/testing';

import { BasckendService } from './basckend.service';

describe('BasckendService', () => {
  let service: BasckendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasckendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
