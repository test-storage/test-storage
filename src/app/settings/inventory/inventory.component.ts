import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { pageTransition } from '../../animations';

import { Device } from './device';
import { InventoryService } from './inventory.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from '../../shared/toast-notifications.service';

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
  selectedDevices = [];
  public devices: Device[];

  public createOpened = false;
  public editOpened = false;
  public deleteOpened = false;

  constructor(
    private inventoryService: InventoryService,
    protected translateService: TranslateService,
    private notificationsService: ToastNotificationsService
  ) { }

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

  onAdd() {
    this.createOpened = true;
  }

  onEdit() {
    this.editOpened = true;
  }

  onDelete() {
    this.deleteOpened = true;
  }

  createDevice(device: Device) {

    this.inventoryService.createDevice(device).subscribe(
      (response: HttpResponse<Device>) => {
        if (response.status === 201) {
          this.notificationsService.successfullyCreated(`${device.manufacturer} ${device.model}`);

          this.devices.push(response.body);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        }
        if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  updateDevice(device: Device) {
    this.inventoryService.updateDevice(device, device._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.successfullyUpdated(`${device.manufacturer} ${device.model}`);

          // update local array
          const foundIndex = this.devices.findIndex(mDevice => mDevice._id === device._id);
          this.devices[foundIndex] = device;

          // remove selection
          this.selectedDevices = [];
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        }
        if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
    // remove selection
    this.selectedDevices = [];
  }

  forceDelete($event) {
    this.selectedDevices.forEach(selectedDevice => {
      this.inventoryService.deleteDevice(selectedDevice._id).subscribe(
        response => {
          if (response.status === 200) {
            this.notificationsService.successfullyDeleted(`${selectedDevice.manufacturer} ${selectedDevice.model}`);
            this.devices = this.devices.filter(devices => devices !== selectedDevice);
          }
        },
        error => {
          console.log(error);
          if (error.error.statusCode === 400) {
            this.notificationsService.badRequest();
          }
          if (error.error.statusCode === 403) {
            this.notificationsService.forbidden();
          } else {
            this.notificationsService.commonError();
          }
        }
      );
    });
    // remove selection
    this.selectedDevices = [];
  }

}
