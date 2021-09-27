import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Settings } from './settings';

@Injectable()
export class SettingsService {

  apiPath = '/api/v1/settings';

  public appSettings!: Settings;

  constructor(private http: HttpClient) {
    this.loadDataFromStorage();
  }

  public setAppSettings(settings: Settings): void {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }

  public getAppSettings(): Settings {
    if (this.appSettings) {
      return this.appSettings;
    } else {
      return {};
    }
  }

  private loadDataFromStorage(): void {
    this.appSettings = JSON.parse(localStorage.getItem('appSettings') as any);
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
