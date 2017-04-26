import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

describe('AuthGuardService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard,
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
            ],
            imports: [RouterTestingModule]
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