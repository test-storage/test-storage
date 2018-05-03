import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  private loggedIn = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private storage: LocalStorageService
  ) {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
  }

  canActivate(
    next?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIfLoggedIn();
  }

  canActivateChild(
    next?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): boolean {

    // if token exist
    if (this.loggedIn && this.storage.tokenNotExpired(this.authService.token)) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
