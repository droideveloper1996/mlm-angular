import { TestBed } from '@angular/core/testing';

import { RegisterGuardService } from './register-guard.service';

describe('RegisterGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterGuardService = TestBed.get(RegisterGuardService);
    expect(service).toBeTruthy();
  });
});
