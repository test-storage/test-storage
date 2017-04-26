import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthenticationService } from '../auth/authentication.service';
import { GroupService } from './group.service';

describe('GroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        GroupService,
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

  it('should ...', inject([GroupService], (service: GroupService) => {
    expect(service).toBeTruthy();
  }));
});
