import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserGroupService } from './user-group.service';

describe('UserGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserGroupService
      ]
    });
  });

  it('should ...', inject([UserGroupService], (service: UserGroupService) => {
    expect(service).toBeTruthy();
  }));
});
