import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

class MockRouter {
  navigate(path: any) { }
}

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AuthGuard;
    let authService;
    let router;
    let localStorageService;

    it('should return true for a logged in user', () => {
      authService = { token: 'token', isLoggedIn: () => new BehaviorSubject<boolean>(true) };
      router = new MockRouter();
      localStorageService = { tokenNotExpired: (token: string) => true };
      authGuard = new AuthGuard(authService as AuthenticationService, router as Router, localStorageService as LocalStorageService);

      expect(authGuard.canActivate()).toEqual(true);
    });

    it('should return false for a not logged in user', () => {
      authService = { token: 'token', isLoggedIn: () => new BehaviorSubject<boolean>(false) };
      router = new MockRouter();
      localStorageService = { tokenNotExpired: (token: string) => false };
      authGuard = new AuthGuard(authService as AuthenticationService, router as Router, localStorageService as LocalStorageService);

      expect(authGuard.canActivate()).toEqual(false);
    });

    it('should return false for a logged in user with expired token', () => {
      authService = { token: 'token', isLoggedIn: () => new BehaviorSubject<boolean>(true) };
      router = new MockRouter();
      localStorageService = { tokenNotExpired: (token: string) => false };
      authGuard = new AuthGuard(authService as AuthenticationService, router as Router, localStorageService as LocalStorageService);

      expect(authGuard.canActivate()).toEqual(false);
    });

    it('should return false for a not logged in user with expired token', () => {
      authService = { token: 'token', isLoggedIn: () => new BehaviorSubject<boolean>(false) };
      router = new MockRouter();
      localStorageService = { tokenNotExpired: (token: string) => true };
      authGuard = new AuthGuard(authService as AuthenticationService, router as Router, localStorageService as LocalStorageService);

      expect(authGuard.canActivate()).toEqual(false);
    });

    it('should return error for a malformed token', () => {
      authService = { token: 'token', isLoggedIn: () => new BehaviorSubject<boolean>(false) };
      router = new MockRouter();
      localStorageService = new LocalStorageService(new JwtHelperService({}));
      authGuard = new AuthGuard(authService as AuthenticationService, router as Router, localStorageService as LocalStorageService);

      expect(() => authGuard.canActivate()).toThrowError();
    });

    xit('should return error for a empty token', () => {
      authService = { token: '', isLoggedIn: () => new BehaviorSubject<boolean>(true) };
      router = new MockRouter();
      localStorageService = new LocalStorageService(new JwtHelperService({}));
      authGuard = new AuthGuard(authService as AuthenticationService, router as Router, localStorageService as LocalStorageService);

      expect(() => authGuard.canActivate()).toThrowError();
    });

    it('should call navigate in router for for a not logged in user', () => {
      authService = { token: 'token', isLoggedIn: () => new BehaviorSubject<boolean>(false) };
      router = new MockRouter();
      localStorageService = { tokenNotExpired: (token: string) => true };
      authGuard = new AuthGuard(authService as AuthenticationService, router as Router, localStorageService as LocalStorageService);
      const spy = jest.spyOn(router, 'navigate');

      expect(authGuard.canActivate()).toEqual(false);
      expect(spy).toHaveBeenCalled();
    });

  });
});
