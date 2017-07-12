import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { User } from '../../models/user';

@Injectable()
export class UserService {

    apiPath = '/api/v1/users';

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        contentHeaders.set('x-access-token', this.authenticationService.token);
        const options = new RequestOptions({ headers: contentHeaders });

        return this.http.get(this.apiPath, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getUser(id: string): Observable<User> {
        contentHeaders.set('x-access-token', this.authenticationService.token);
        const options = new RequestOptions({ headers: contentHeaders });

        return this.http.get(this.apiPath + '/' + id, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getUsersMe(): Observable<User> {
        contentHeaders.set('x-access-token', this.authenticationService.token);
        const options = new RequestOptions({ headers: contentHeaders });

        return this.http.get(this.apiPath + '/' + 'me', options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    public createUser(user: User): Observable<Number> {
        const body = JSON.stringify(user);

        contentHeaders.set('x-access-token', this.authenticationService.token);
        const options = new RequestOptions({ headers: contentHeaders });

        return this.http.post(this.apiPath, body, options)
            .map((response: Response) => response.status)
            .catch(this.handleError);
    }

    public deleteUser(id: string): Observable<Number> {
        contentHeaders.set('x-access-token', this.authenticationService.token);
        const options = new RequestOptions({ headers: contentHeaders });

        return this.http.delete(this.apiPath + '/' + id, options)
            .map((response: Response) => response.status)
            .catch(this.handleError);
    }



    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().status + ' ' + error.json().message || 'Server error');
    }
}
