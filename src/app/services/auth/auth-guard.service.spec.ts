import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { LoginComponent } from '../../modules/auth/login/login.component';

// import { Router } from '@angular/router'; // TODO remove

import { AuthGuard, AuthenticationService, LocalStorageService } from './index';

describe('AuthGuardService', () => {

    beforeEach(() => {
        let store = {};

        spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
            return JSON.stringify(store[key]) || null;
        });
        spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
            delete store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
            return store[key] = <string>value;
        });
        spyOn(localStorage, 'clear').and.callFake(() => {
            store = {};
        });
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
                })
            ],
            declarations: [LoginComponent],
            providers: [AuthGuard,
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


    it('checks if a user is valid',

        // inject your guard service AND Router
        async(inject([AuthGuard, Router], (auth, router) => {

            // add a spy
            spyOn(router, 'navigate');

            expect(auth.canActivate()).toBeFalsy();
            expect(router.navigate).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledWith(['/auth']);
        }))
    );

});
