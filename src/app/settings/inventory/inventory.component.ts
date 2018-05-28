import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { pageTransition } from '../../animations';

import { Device } from './device';
import { InventoryService } from './inventory.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

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
    private notificationsService: NotificationsService
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
          this.notificationsService.success(
            `${device.manufacturer} ${device.model}`,
            this.translateService.instant('COMMON.SUCCESSFULLY_CREATED')
          );
          this.devices.push(response.body);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 403) {
          this.notificationsService.warn(
            this.translateService.instant('COMMON.FORBIDDEN'),
            this.translateService.instant('COMMON.PERMISSIONS')
          );
        } else {
          this.notificationsService.error(
            this.translateService.instant('COMMON.ERROR_OCCURED'),
            this.translateService.instant('COMMON.ERROR_ACTION')
          );
        }
      }
    );
  }

  updateDevice(device: Device) {
    this.inventoryService.updateDevice(device, device._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.success(
            `${device.manufacturer} ${device.model}`,
            this.translateService.instant('COMMON.SUCCESSFULLY_UPDATED')
          );

          // update local array of users
          const foundIndex = this.devices.findIndex(mDevice => mDevice._id === device._id);
          this.devices[foundIndex] = device;

          // remove selection
          this.selectedDevices = [];
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 403) {
          this.notificationsService.warn(
            this.translateService.instant('COMMON.FORBIDDEN'),
            this.translateService.instant('COMMON.PERMISSIONS')
          );
        } else {
          this.notificationsService.error(
            this.translateService.instant('COMMON.ERROR_OCCURED'),
            this.translateService.instant('COMMON.ERROR_ACTION')
          );
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
            this.notificationsService.success(
              `${selectedDevice.manufacturer} ${selectedDevice.model}`,
              this.translateService.instant('COMMON.SUCCESSFULLY_DELETED')
            );
            this.devices = this.devices.filter(devices => devices !== selectedDevice);
          }
        },
        error => {
          console.log(error);
          if (error.error.statusCode === 403) {
            this.notificationsService.warn(
              this.translateService.instant('COMMON.FORBIDDEN'),
              this.translateService.instant('COMMON.PERMISSIONS')
            );
          } else {
            this.notificationsService.error(
              this.translateService.instant('COMMON.ERROR_OCCURED'),
              this.translateService.instant('COMMON.ERROR_ACTION')
            );
          }
        }
      );
    });
    // remove selection
    this.selectedDevices = [];
  }

}
