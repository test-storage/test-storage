import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { contentHeaders } from './headers';

import { Observable, BehaviorSubject } from 'rxjs';

import { User } from './user';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthenticationService {

  public token: string;
  private loggedIn$ = new BehaviorSubject<boolean>(this.storage.getToken() != null ? true : false);

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) {
    // set token if saved in local storage
    this.token = this.storage.getToken();
  }

  login(user: User): Observable<any> {
    return this.http.post('/authentication/login', user, { headers: contentHeaders });
  }

  setToken(response: any) {
    // login successful if there's a jwt token in the response
    const accessToken = response && response.accessToken;

    if (accessToken) {
      // set token property
      this.token = accessToken;

      // store username and jwt token in local storage to keep user logged in between page refreshes
      this.storage.setToken(accessToken);
      // this.storage.setUser(response.user);

      // return true to indicate successful login
      this.loggedIn$.next(true);
    } else {
      // return false to indicate failed login
      this.loggedIn$.next(false);
    }
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn$;
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = '';
    this.storage.removeToken();
    // this.storage.removeUser();
    this.loggedIn$.next(false);
  }

}
