import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

import { Device } from './device';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  animations: [pageTransition]
})
export class InventoryComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  subscription;
  devices: Device[];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.loadDevices();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadDevices() {
    this.subscription = this.inventoryService.getDevices().subscribe(
      data => this.devices = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

}
