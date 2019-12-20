import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocalStorageService } from './local-storage.service';

import { ProjectsService } from './../projects/projects.service';

describe(`AuthInterceptor`, () => {
  let service: ProjectsService;
  let httpMock: HttpTestingController;
  let localStorageService: LocalStorageService;

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
          useValue: { getToken: (token) => 'token' }
        }
      ],
    });

    service = TestBed.get(ProjectsService);
    httpMock = TestBed.get(HttpTestingController);
    localStorageService = TestBed.get(LocalStorageService);
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
