import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from './local-storage.service';


describe('AuthenticationService', () => {
  let httpMock: HttpTestingController;
  let service: AuthenticationService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService, { provide: LocalStorageService, useValue: { getToken: () => 'token'}}]
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should return token on login() method', () => {
    const user = {username: 'email', password: 'admin', rememberMe: false };

    service.login(user).subscribe(response => {
      expect(response).toEqual({ token: 'token '});
    });

    const req = httpMock.expectOne('/authentication/login');
    req.flush({token: 'token'});
    httpMock.verify();
  });
});
