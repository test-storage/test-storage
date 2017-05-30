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



    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
