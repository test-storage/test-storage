import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthenticationService } from '../auth/authentication.service';
import { TestsuiteService } from './testsuite.service';

describe('TestsuiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        TestsuiteService,
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

  it('should ...', inject([TestsuiteService], (service: TestsuiteService) => {
    expect(service).toBeTruthy();
  }));
});
