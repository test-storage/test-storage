import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });
/* TODO with auth
  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
  */
});