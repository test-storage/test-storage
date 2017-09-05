import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestplanService } from './testplan.service';

describe('TestplanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TestplanService
      ]
    });
  });

  it('should ...', inject([TestplanService], (service: TestplanService) => {
    expect(service).toBeTruthy();
  }));
});
