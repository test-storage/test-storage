import { TestBed, inject } from '@angular/core/testing';

import { RolesService } from './roles.service';

xdescribe('RolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolesService]
    });
  });

  it('should be created', inject([RolesService], (service: RolesService) => {
    expect(service).toBeTruthy();
  }));
});
