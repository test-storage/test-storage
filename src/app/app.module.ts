import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';

import { AuthGuard, AuthenticationService, LocalStorageService } from './services/auth/index';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    LayoutModule,
    ModalModule.forRoot(),
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    AuthenticationService,
    LocalStorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
