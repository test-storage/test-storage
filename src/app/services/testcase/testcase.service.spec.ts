import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService, LocalStorageService } from '../auth/index';
import { TestcaseService } from './testcase.service';

describe('TestcaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthenticationService,
        LocalStorageService,
        TestcaseService
      ]
    });
  });


  it('should ...', inject([TestcaseService], (service: TestcaseService) => {
    expect(service).toBeTruthy();
  }));

});
