import { TestBed } from '@angular/core/testing';

import { EmailInputService } from './email-input.service';

describe('EmailInputService', () => {
  let service: EmailInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
