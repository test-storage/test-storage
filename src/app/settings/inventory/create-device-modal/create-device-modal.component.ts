import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Device, DeviceType } from '../device';

@Component({
  selector: 'app-create-device-modal',
  templateUrl: './create-device-modal.component.html',
  styleUrls: ['./create-device-modal.component.css']
})
export class CreateDeviceModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() deviceChange = new EventEmitter<Device>();

  public device: Device;
  public deviceTypes = DeviceType;
  typeKeys; // Type enumeration keys

  constructor() {
    this.device = new Device();
  }

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  createDevice() {
    console.log(this.device);
    this.deviceChange.emit(this.device);
    this.device = new Device();
  }

  ngOnInit() {
    this.typeKeys = Object.keys(this.deviceTypes).filter(f => !isNaN(Number(f))).map(key => (
      { value: this.deviceTypes[key], key: parseInt(key, 10) }));
  }

}
