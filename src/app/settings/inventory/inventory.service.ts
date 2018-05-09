import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Device } from './device';

@Injectable()
export class InventoryService {

  apiPath = '/api/v1/devices';

  constructor(private http: HttpClient) { }

  public getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiPath);
  }

  public getDevice(id: string): Observable<Device> {
    return this.http.get<Device>(this.apiPath + '/' + id);
  }

  public createDevice(device: Device) {
    return this.http.post(this.apiPath, device, { observe: 'response' });
  }

  public deleteDevice(id: string) {
    return this.http.delete(this.apiPath + '/' + id, { observe: 'response' });
  }

}
