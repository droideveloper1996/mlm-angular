import { TestBed } from '@angular/core/testing';

import { StudentServicesService } from './student-services.service';

describe('StudentServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentServicesService = TestBed.get(StudentServicesService);
    expect(service).toBeTruthy();
  });
});
