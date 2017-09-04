import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticationService, LocalStorageService } from '../auth/index';
import { UserGroupService } from './user-group.service';

describe('UserGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthenticationService,
        LocalStorageService,
        UserGroupService
      ]
    });
  });

  it('should ...', inject([UserGroupService], (service: UserGroupService) => {
    expect(service).toBeTruthy();
  }));
});
