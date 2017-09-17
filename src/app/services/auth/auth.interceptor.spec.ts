import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocalStorageService } from './local-storage.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {

  const mockLocalStorageService = {
    getToken() {
      return 'fakeToken';
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthInterceptor,
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', inject([AuthInterceptor], (service: AuthInterceptor) => {
    expect(service).toBeTruthy();
  }));

  describe('Making http calls', () => {

    it('should add auth header', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

      http.get('/api/v1/testcases').subscribe(
        response => {
          expect(response).toBeTruthy();
        }
      );

      const req = httpMock.expectOne(req =>
        req.headers.has('x-access-token') &&
        req.headers.get('x-access-token') === `${mockLocalStorageService.getToken()}`);

      expect(req.request.method).toEqual('GET');

      req.flush({});
      httpMock.verify();
    }));


    it('should not add auth header if request url not contains /api/',
      inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

        http.post('/login', { username: 'test', password: 'test' }).subscribe(
          response => {
            expect(response).toBeTruthy();
          }
        );

        const req = httpMock.expectOne(req => !req.headers.has('x-access-token'));

        expect(req.request.method).toEqual('POST');

        req.flush({});
        httpMock.verify();
      }));
  });
});
