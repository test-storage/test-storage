import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UsersService {

  apiPath = '/api/v1/users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiPath);
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(this.apiPath + '/' + id);
  }

  public createUser(user: User) {
    return this.http.post(this.apiPath, user, { observe: 'response' });
  }

  public updateUser(user: User, id?: string) {
    if (id !== undefined) {
      return this.http.put(`${this.apiPath}/${id}`, user, { observe: 'response' });
    } else {
      return this.createUser(user);
    }
  }

  public deleteUser(id: string) {
    return this.http.delete(this.apiPath + '/' + id, { observe: 'response' });
  }

}
