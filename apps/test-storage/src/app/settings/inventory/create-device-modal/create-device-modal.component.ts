import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Device, DeviceType } from '../device';

@Component({
  selector: 'app-create-device-modal',
  templateUrl: './create-device-modal.component.html',
  styleUrls: ['./create-device-modal.component.css']
})
export class CreateDeviceModalComponent {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() deviceChange = new EventEmitter<Device>();

  public device: Device;
  public deviceTypes = Object.keys(DeviceType).map(type => ({ value: type }));

  constructor() {
    this.device = new Device();
  }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createDevice(): void {
    console.log(this.device);
    this.deviceChange.emit(this.device);
    this.device = new Device();
  }

}
