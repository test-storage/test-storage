import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { UserService } from './user.service';
import { User } from '../../models/user';
import { AuthenticationService } from '../auth/index';

describe('UserService', () => {

  let subject: UserService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        AuthenticationService,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend
      ]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});