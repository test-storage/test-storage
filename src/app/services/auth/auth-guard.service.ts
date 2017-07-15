import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  canActivate(): boolean {
    return this.checkIfLoggedIn();
  }

  canActivateChild(): boolean {
    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): boolean {

    if (localStorage.getItem('currentUser')) {

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser && currentUser.token;

      // if token exist
      if (token) {
        if (tokenNotExpired(null, token)) {
          // if token not expired return true
          return true;
        }
      }
    }

    // if token expired or not exist redirect to login page
    this.router.navigate(['/auth']);
    return false;
  }
}
