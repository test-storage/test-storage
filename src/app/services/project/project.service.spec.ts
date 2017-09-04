import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService, LocalStorageService } from '../auth/index';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        NotificationsService,
        AuthenticationService,
        LocalStorageService,
        ProjectService
      ]
    });
  });

  it('should ...', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
