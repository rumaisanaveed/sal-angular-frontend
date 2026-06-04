import { TestBed } from '@angular/core/testing';

import { AccountTabService } from './account-tab.service';

describe('AccountTabService', () => {
  let service: AccountTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
