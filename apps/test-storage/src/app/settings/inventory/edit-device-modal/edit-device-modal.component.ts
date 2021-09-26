import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Device, DeviceType } from '../device';

@Component({
  selector: 'app-edit-device-modal',
  templateUrl: './edit-device-modal.component.html',
  styleUrls: ['./edit-device-modal.component.css']
})
export class EditDeviceModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() deviceChange = new EventEmitter<Device>();
  @Input() device!: Device;
  public deviceTypes = DeviceType;
  typeKeys!: any[]; // Type enumeration keys

  constructor() { }

  setOpened(val: boolean): void {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  updateDevice(): void {
    this.deviceChange.emit(this.device);
  }

  ngOnInit(): void {
    this.typeKeys = Object.keys(this.deviceTypes).filter(f => !isNaN(Number(f))).map((key: any) => (
      { value: this.deviceTypes[key], key: parseInt(key, 10) }));
  }

}
