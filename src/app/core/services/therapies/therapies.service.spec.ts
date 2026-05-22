import { TestBed } from '@angular/core/testing';

import { TherapiesService } from './therapies.service';

describe('TherapiesService', () => {
  let service: TherapiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
