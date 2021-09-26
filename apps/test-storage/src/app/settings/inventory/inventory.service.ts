import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  public createDevice(device: Device): Observable<HttpResponse<Device>> {
    return this.http.post<Device>(this.apiPath, device, { observe: 'response' });
  }

  public updateDevice(device: Device, id?: string): Observable<HttpResponse<Device>> {
    if (id !== undefined) {
      return this.http.put<Device>(`${this.apiPath}/${id}`, device, { observe: 'response' });
    } else {
      return this.createDevice(device);
    }
  }

  public deleteDevice(id: string): Observable<HttpResponse<Device>> {
    return this.http.delete<Device>(this.apiPath + '/' + id, { observe: 'response' });
  }

}
