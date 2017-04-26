import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService, contentHeaders } from '../auth/index';
import { User } from '../../models/user';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        contentHeaders.append('x-access-token', this.authenticationService.token);
        const options = new RequestOptions({ headers: contentHeaders });

        // get users from api
        return this.http.get('/api/v1/users', options)
            .map((response: Response) => response.json());
    }
}