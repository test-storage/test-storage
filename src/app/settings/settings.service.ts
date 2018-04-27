import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Settings } from './settings';

@Injectable()
export class SettingsService {

  apiPath = '/api/v1/settings';

  public appSettings: Settings;

  constructor(private http: HttpClient) {
    this.loadDataFromStorage();
  }

  public setAppSettings(settings: Settings) {
    console.log(settings);
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }

  public getAppSettings() {
    if (this.appSettings) {
      console.log(this.appSettings);
      return this.appSettings;
    } else {
      return undefined;
    }
  }

  private loadDataFromStorage() {
    this.appSettings = JSON.parse(localStorage.getItem('appSettings'));
  }

  public getSettings(): Observable<Settings[]> {
    return this.http.get<Settings[]>(this.apiPath);
  }

  public getSettingsById(id: string): Observable<Settings> {
    return this.http.get<Settings>(`${this.apiPath}/${id}`);
  }

  public createSettings(user: Settings) {
    return this.http.post(this.apiPath, user, { observe: 'response' });
  }

  public deleteSettings(id: string) {
    return this.http.delete(`${this.apiPath}/${id}`, { observe: 'response' });
  }

}
