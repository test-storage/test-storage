import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router'; // TODO remove
import { FormsModule } from '@angular/forms';

import { AuthGuard, AuthenticationService, LocalStorageService } from './index';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LoginComponent } from '../../components/login/login.component';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';


describe('AuthenticationService', () => {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcklkIjoiM2ViYmNlNjk2ZDNlMTllMzIzYmM1NDBmYjRhMzRmYjQiLCJpYXQiOjE1MDU2NzYwMTEsImV4cCI6MTUwNTc2MjQxMX0' +
    '.DLfWHNWUZn29c7iz2aTxt_Y8BwE1qvzLIAW6FpHO-uI';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
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
        LocalStorageService,
        JwtHelperService,
        {
          provide: JWT_OPTIONS,
          useValue: {}
        }
      ]
    });
  });


  it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('should be false if valid token expired', inject([AuthenticationService, LocalStorageService],
    (service: AuthenticationService, storage: LocalStorageService) => {
      storage.setToken(token);

      expect(storage.tokenNotExpired('')).toBeFalsy();
      storage.removeTokens();
    }));

  it('should throw Error if invalid token provided', inject([AuthenticationService, LocalStorageService],
    (service: AuthenticationService, storage: LocalStorageService) => {
      storage.setToken('token');

      expect(() => { storage.tokenNotExpired('token'); }).toThrow(
        new Error(
          'The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.'
        ));
      storage.removeTokens();
    }));


  it('checks Auth Guard: if a user is valid',

    // inject your guard service AND Router
    (inject([AuthGuard, Router], (authGuard, router) => {

      // add a spy
      spyOn(router, 'navigate');

      expect(authGuard.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/auth']);
    })
    ));

});
