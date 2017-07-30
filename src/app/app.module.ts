import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AuthenticationService } from './services/auth/authentication.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// App routes
const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  {
    path: '', loadChildren: './modules/layout/layout.module#LayoutModule'
  },
  // otherwise redirect to 404 page
  { path: '**', component: NotFoundComponent }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    LayoutModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
