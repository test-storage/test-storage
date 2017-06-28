import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { contentHeaders } from './headers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username, password): Observable<boolean> {
        return this.http.post('/login', JSON.stringify({ username: username, password: password }), { headers: contentHeaders })
            .map((response: Response) => {

                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;

                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({
                        username: username,
                        token: token,
                        firstName: response.json().user[0].firstName,
                        lastName: response.json().user[0].lastName,
                        title: response.json().user[0].title
                    }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
            .catch(this.handleError);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = '';
        localStorage.removeItem('currentUser');
    }

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

}
