import { Injectable }            from '@angular/core';
import { CanActivate, Router }   from '@angular/router';
import { AuthenticationService } from './../services/auth/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
  }
}