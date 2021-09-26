import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../settings/users/user';

@Injectable()
export class LocalStorageService {

  private token = '';

  constructor(private jwtHelper: JwtHelperService) { }

  getToken(): string {

    if (this.token === '') {
      const token = this.getTokenFromStorage() || '';
      this.token = token;
      return this.token;
    } else {
      return this.token;
    }
  }

  getTokenFromStorage(): string | void {
    if (localStorage.getItem('authToken')) {

      const authToken = JSON.parse(localStorage.getItem('authToken') as string);
      const token = authToken && authToken.token;

      if (token) {
        this.token = token;
        return token;
      } else {
        this.token = '';
        return '';
      }
    }
  }

  tokenNotExpired(token: string): boolean {
    // if token not expired return true
    return !this.jwtHelper.isTokenExpired(token);
  }

  setToken(token: string): void {
    // store jwt token in local sotrage to keep user logged in between page refreshes
    localStorage.setItem('authToken', JSON.stringify({
      token
    }));
    this.token = token;
  }



  removeToken(): void {
    localStorage.removeItem('authToken');
  }


  getUser(): string {
    return JSON.parse(localStorage.getItem('authUser') as string);
  }

  setUser(userObject: User): void {
    localStorage.setItem('authUser', JSON.stringify({
      username: userObject.email,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      jobTitle: userObject.workInfo?.jobTitle
    }));
  }

  removeUser(): void {
    localStorage.removeItem('authUser');
  }

}
