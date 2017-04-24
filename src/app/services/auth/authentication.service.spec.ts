import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard, AuthenticationService } from './index';
import { LoginComponent } from '../../components/login/login.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';
import { FormsModule } from '@angular/forms';

describe('AuthenticationService', () => {

  let subject: AuthenticationService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TranslateModule,
        RouterTestingModule.withRoutes([
          {
            path: 'auth',
            component: LoginComponent
          }
        ])
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        AuthGuard,
        AuthenticationService,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
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

  it('checks Auth Guard: if a user is valid',

    // inject your guard service AND Router
    (inject([AuthGuard, Router], (authGuard, router) => {

      // add a spy
      // spyOn(router, 'navigate');

      expect(authGuard.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalled();
    })
    ));
});
