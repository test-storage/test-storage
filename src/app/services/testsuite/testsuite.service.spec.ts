import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestsuiteService } from './testsuite.service';

describe('TestsuiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TestsuiteService
      ]
    });
  });

  it('should ...', inject([TestsuiteService], (service: TestsuiteService) => {
    expect(service).toBeTruthy();
  }));
});
