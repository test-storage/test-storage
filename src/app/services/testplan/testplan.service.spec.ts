import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService, LocalStorageService } from '../auth/index';
import { TestplanService } from './testplan.service';

describe('TestplanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthenticationService,
        LocalStorageService,
        TestplanService
      ]
    });
  });

  it('should ...', inject([TestplanService], (service: TestplanService) => {
    expect(service).toBeTruthy();
  }));
});
