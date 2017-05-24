import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AuthenticationService } from './services/auth/authentication.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { TestcaseListComponent } from './components/testcase-list/testcase-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

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
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-access-token',
    tokenName: 'token',
    noJwtError: true,
    tokenGetter: (() => localStorage.getItem('currentUser')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    LayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    TestcaseListComponent,
    UserListComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
