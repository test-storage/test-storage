import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthenticationService } from '../auth/authentication.service';
import { TestcaseService } from './testcase.service';

describe('TestcaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        TestcaseService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });


  it('should ...', inject([TestcaseService], (service: TestcaseService) => {
    expect(service).toBeTruthy();
  }));

});
