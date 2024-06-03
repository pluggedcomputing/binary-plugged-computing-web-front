import { TestBed } from '@angular/core/testing';

import { UserInputService } from './user.service';

describe('EmailInputService', () => {
  let service: UserInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
