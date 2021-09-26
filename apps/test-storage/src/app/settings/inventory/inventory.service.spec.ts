import { TestBed, inject } from '@angular/core/testing';

import { InventoryService } from './inventory.service';

xdescribe('InventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService]
    });
  });

  it('should be created', inject([InventoryService], (service: InventoryService) => {
    expect(service).toBeTruthy();
  }));
});
