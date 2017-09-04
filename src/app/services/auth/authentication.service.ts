import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { contentHeaders } from './headers';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthenticationService {

    public token: string;
    private loggedIn$ = new BehaviorSubject<boolean>(this.storage.getToken() != null ? true : false);

    constructor(
        private http: HttpClient,
        private storage: LocalStorageService
    ) {
        // set token if saved in local storage
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        this.token = authToken && authToken.token;
    }

    login(username, password): void {

        this.http.post('/login', { username: username, password: password }, { headers: contentHeaders })
            .subscribe((response: any) => {

                // login successful if there's a jwt token in the response
                const token = response && response.token;

                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    this.storage.setToken(token);
                    this.storage.setUser(response.user);

                    // return true to indicate successful login
                    this.loggedIn$.next(true);
                } else {
                    // return false to indicate failed login
                    this.loggedIn$.next(false);
                }
            }, () => {
                this.loggedIn$.next(false);
            });
        // .catch(this.handleError);

    }

    getToken(): string {
        return this.storage.getToken();
    }

    isLoggedIn(): BehaviorSubject<boolean> {
        return this.loggedIn$;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = '';
        this.storage.removeToken();
        this.storage.removeUser();
        this.loggedIn$.next(false);
    }

    /*
    private handleError(error: Response) {
        console.error(error);
        if (error.status === 401) {
            const errorMessage = 'LOGINPAGE.INVALID_CREDENTIALS'; // translation key
            return Observable.throw(errorMessage);
        } else {
            // TODO add translation for server error via ERROR.SERVER_ERROR
            const serverError = 'Server error';
            return Observable.throw(error.json().status + ' ' + error.json().message || 'Server error');
        }

    }
 */
}
