import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(translate: TranslateService) {
        translate.addLangs(['en', 'ru', 'de', 'fr', 'es', 'it']);
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        // translate.use('en');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ru|de|es|it|fr/) ? browserLang : 'en');
    }
}
