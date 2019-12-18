import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class LocalStorageService {

  private token = '';

  constructor(private jwtHelper: JwtHelperService) { }

  getToken(): string {

    if (this.token === '') {
      const token = this.getTokenFromStorage();
      this.token = token;
      return this.token;
    } else {
      return this.token;
    }
  }

  getTokenFromStorage() {
    if (localStorage.getItem('authToken')) {

      const authToken = JSON.parse(localStorage.getItem('authToken'));
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
    if (token) {
      // if token not expired return true
      const isExpired = this.jwtHelper.isTokenExpired(token);
      if (isExpired === true) {
        return false;
      } else {
        return true;
      }
    } else {
      console.error('Token not provided.');
      return false;
    }
  }

  setToken(token: string) {
    // store jwt token in local sotrage to keep user logged in between page refreshes
    localStorage.setItem('authToken', JSON.stringify({
      token
    }));
    this.token = token;
  }



  removeToken(): void {
    localStorage.removeItem('authToken');
  }


  getUser() {
    return JSON.parse(localStorage.getItem('authUser'));
  }

  setUser(userObject) {
    // store user data: username, firstname, lastnamet and job title
    localStorage.setItem('authUser', JSON.stringify({
      username: userObject.email,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      title: userObject.title
    }));
  }

  removeUser(): void {
    localStorage.removeItem('authUser');
  }

}
