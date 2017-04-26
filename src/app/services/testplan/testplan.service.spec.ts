import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthenticationService } from '../auth/authentication.service';
import { TestplanService } from './testplan.service';

describe('TestplanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        TestplanService,
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

  it('should ...', inject([TestplanService], (service: TestplanService) => {
    expect(service).toBeTruthy();
  }));
});
