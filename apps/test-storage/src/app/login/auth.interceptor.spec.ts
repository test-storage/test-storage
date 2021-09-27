import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { LocalStorageService } from './local-storage.service';

import { ProjectsService } from './../projects/projects.service';

describe(`AuthInterceptor`, () => {
  let service: ProjectsService;
  let httpMock: HttpTestingController;
  let localStorageService: LocalStorageService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProjectsService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: LocalStorageService,
          useValue: { getToken: (token: {token: string}) => 'token' }
        }
      ],
    });

    service = TestBed.inject(ProjectsService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should add an Authorization header', () => {

    service.getProjects().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(r => r.headers.has('Authorization') &&
    r.headers.get('Authorization') === 'Bearer token');

    expect(req.request.method).toEqual('GET');

    req.flush({ hello: 'world' });
    httpMock.verify();
  });

});
