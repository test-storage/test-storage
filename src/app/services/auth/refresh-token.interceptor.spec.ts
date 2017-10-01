import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocalStorageService } from './local-storage.service';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';

describe('RefhreshTokenInterceptor', () => {

  const mockLocalStorageService = {
    getRefreshToken() {
      return 'fakeToken';
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RefreshTokenInterceptor,
        {
          provide: LocalStorageService,
          useValue: mockLocalStorageService
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RefreshTokenInterceptor,
          multi: true
        }
      ]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', inject([RefreshTokenInterceptor], (service: RefreshTokenInterceptor) => {
    expect(service).toBeTruthy();
  }));

  describe('Making http calls', () => {

    it('should add refresh auth header if request to /authentication/refresh',
      inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

        http.post('/authentication/refresh', { headers: mockLocalStorageService.getRefreshToken() }).subscribe(
          response => {
            expect(response).toBeTruthy();
          }
        );

        const req = httpMock.expectOne(request =>
          request.headers.has('x-refresh-token') &&
          request.headers.get('x-refresh-token') === `${mockLocalStorageService.getRefreshToken()}`);

        expect(req.request.method).toEqual('POST');

        req.flush({});
        httpMock.verify();
      }));

  });
});
