import { Component, OnInit, OnDestroy } from '@angular/core';
import { Device } from './device';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  subscription;
  devices: Device[];
  /*
   [
    {
      manufacturer: 'Apple',
      model: 'Iphone 5s',
      os: 'iOS',
      osVersion: '9',
      type: 0,
      description: 'Testing Iphone',
      assignedTo: ['John Doe']
    },
    {
      manufacturer: 'Samsung',
      model: 'Galaxy S8',
      os: 'Android',
      osVersion: '7',
      type: 0,
      description: 'Testing Android device',
      assignedTo: ['John Doe']
    },
    {
      manufacturer: 'Apple',
      model: 'iPad Air',
      os: 'iOS',
      osVersion: '9',
      type: 1,
      description: 'Testing iPad',
      assignedTo: ['John Doe']
    },
    {
      manufacturer: 'IBM',
      model: 'x3550 M3',
      os: 'Cent OS',
      osVersion: '7',
      type: 2,
      description: 'Testing Web Server',
      assignedTo: ['John Doe']
    },
    {
      manufacturer: 'KVM',
      model: '',
      os: 'Cent OS',
      osVersion: '7',
      type: 4,
      description: 'Testing Web Server',
      assignedTo: ['John Doe']
    }
  ];
  */

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
