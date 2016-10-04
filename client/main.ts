// import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));