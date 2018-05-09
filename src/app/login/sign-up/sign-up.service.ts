import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

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
