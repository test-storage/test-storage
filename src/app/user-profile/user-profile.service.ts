import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UserProfileService {

  apiPath = '/api/v1/users/me';

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User> {
    return this.http.get<User>(this.apiPath);
  }

  public updateUser(user: User) {
    return this.http.put(`${this.apiPath}/${user._id}`, user, { observe: 'response' });
  }

}
