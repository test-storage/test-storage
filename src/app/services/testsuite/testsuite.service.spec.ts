import { TestBed, inject } from '@angular/core/testing';

import { TestsuiteService } from './testsuite.service';

describe('TestsuiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestsuiteService]
    });
  });

  it('should ...', inject([TestsuiteService], (service: TestsuiteService) => {
    expect(service).toBeTruthy();
  }));
});
