import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { User } from '../../models/user';

@Injectable()
export class UserService {

    apiPath = '/api/v1/users';

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        contentHeaders.set('x-access-token', this.authenticationService.token);
        return this.http.get<User[]>(this.apiPath, { headers: contentHeaders });
    }

    getUser(id: string): Observable<User> {
        contentHeaders.set('x-access-token', this.authenticationService.token);
        return this.http.get<User>(this.apiPath + '/' + id, { headers: contentHeaders });
    }

    getUsersMe(): Observable<User> {
        contentHeaders.set('x-access-token', this.authenticationService.token);
        return this.http.get<User>(this.apiPath + '/' + 'me', { headers: contentHeaders });
    }

    public createUser(user: User): Observable<Number> {
        const body = JSON.stringify(user);
        contentHeaders.set('x-access-token', this.authenticationService.token);
        return this.http.post(this.apiPath, body, { headers: contentHeaders })
            .map((response: Response) => response.status);
        //   .catch(this.handleError);
    }

    public deleteUser(id: string): Observable<Number> {
        contentHeaders.set('x-access-token', this.authenticationService.token);
        return this.http.delete(this.apiPath + '/' + id, { headers: contentHeaders })
            .map((response: Response) => response.status);
        //  .catch(this.handleError);
    }


    /*
        private handleError(error: Response) {
            console.error(error);
            return Observable.throw(error.json().status + ' ' + error.json().message || 'Server error');
        }
        */
}
