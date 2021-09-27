import { TranslateService } from '@ngx-translate/core';
import { Component, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';
import { SettingsService } from '../settings.service';
import { Settings } from '../settings';

@Component({
  selector: 'app-main-settings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.css'],
  animations: [pageTransition]
})
export class MainSettingsComponent {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  constructor(
    public translateService: TranslateService,
    private appSettingsService: SettingsService
  ) { }

  changeLanguage(language: string): void {
    const loadedSettings: Settings | undefined = this.appSettingsService.getAppSettings();
    let settings: Settings;
    if (!loadedSettings) {
      settings = new Settings();
    } else {
      settings = loadedSettings;
    }
    settings.language = language;
    this.appSettingsService.setAppSettings(settings);
    this.translateService.use(language);
  }

}
