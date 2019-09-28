import { TestBed } from '@angular/core/testing';

import { AddHeaderInterceptorService } from './add-header-interceptor.service';

describe('AddHeaderInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddHeaderInterceptorService = TestBed.get(AddHeaderInterceptorService);
    expect(service).toBeTruthy();
  });
});
