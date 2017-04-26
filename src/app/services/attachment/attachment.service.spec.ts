import { TestBed, inject } from '@angular/core/testing';

import { AttachmentService } from './attachment.service';

describe('AttachmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttachmentService]
    });
  });

  it('should ...', inject([AttachmentService], (service: AttachmentService) => {
    expect(service).toBeTruthy();
  }));
});
