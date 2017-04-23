import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {

  let subject: AuthenticationService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
  beforeEach(inject([AuthenticationService, MockBackend], (authenticationService: AuthenticationService, mockBackend: MockBackend) => {
    subject = authenticationService;
    backend = mockBackend;
  }));


  it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

});
