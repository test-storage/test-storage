import { TestBed, inject } from '@angular/core/testing';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        JwtHelperService,
        {
          provide: JWT_OPTIONS,
          useValue: {}
        }
      ]
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
