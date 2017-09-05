import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  private token = '';

  getToken(): string {

    if (this.token === '') {
      const token = this.getTokenFromStorage();
      this.token = token;
      return this.token;
    } else {
      return this.token;
    }
  }

  private getTokenFromStorage() {
    if (localStorage.getItem('authToken')) {

      const currentUser = JSON.parse(localStorage.getItem('authToken'));
      const token = currentUser && currentUser.token;

      if (token) {
        this.token = token;
        return token;
      } else {
        this.token = '';
        return '';
      }
    }
  }

  tokenNotExpired(): boolean {
    const token = this.getToken();

    if (token) {
      // if token not expired return true
      const notExpired = tokenNotExpired(null, token);

      if (notExpired === true) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error('Token not provided.');
    }
  }

  setToken(token: string) {
    // store jwt token in local sotrage to keep user logged in between page refreshes
    localStorage.setItem('authToken', JSON.stringify({
      token: token
    }));
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
      title: userObject.work.title
    }));
  }

  removeUser(): void {
    localStorage.removeItem('authUser');
  }

}
