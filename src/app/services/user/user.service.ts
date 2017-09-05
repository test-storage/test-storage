import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../auth/index';
import { User } from '../../models/user';

@Injectable()
export class UserService {

    apiPath = '/api/v1/users';

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiPath);
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(this.apiPath + '/' + id);
    }

    getUsersMe(): Observable<User> {
        return this.http.get<User>(this.apiPath + '/' + 'me');
    }

    public createUser(user: User) {
        return this.http.post(this.apiPath, user, { observe: 'response' });
    }

    public deleteUser(id: string) {
        return this.http.delete(this.apiPath + '/' + id, { observe: 'response' });
    }

}
