import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    translate: TranslateService,
    appSettingsService: SettingsService
  ) {
    translate.addLangs(['en', 'ru']); // , 'de', 'fr', 'es', 'it'
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // translate.use('en');
    const appSettings = appSettingsService.getAppSettings();
    if (appSettings && appSettings.language) {
      translate.use(appSettings.language);
    } else {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|ru/) ? browserLang : 'en'); // |de|es|it|fr
    }
  }

}
