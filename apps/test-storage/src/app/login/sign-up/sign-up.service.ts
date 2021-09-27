import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../settings/users/user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  apiPath = '/authentication/signup';

  constructor(private http: HttpClient) { }

  public registerNewUser(user: User) {
    return this.http.post(this.apiPath, user, { observe: 'response' });
  }

}
