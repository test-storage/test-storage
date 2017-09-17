import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router'; // TODO remove
import { FormsModule } from '@angular/forms';

import { AuthGuard, AuthenticationService, LocalStorageService } from './index';

import { LoginComponent } from '../../components/login/login.component';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';


describe('AuthenticationService', () => {

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
        LocalStorageService
      ]
    });
  });

  it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
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
