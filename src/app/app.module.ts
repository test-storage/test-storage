import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { RefreshTokenInterceptor } from './services/auth/refresh-token.interceptor';
import { LocalStorageService } from './services/auth/index';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
/*
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { RefreshTokenInterceptor } from './services/auth/refresh-token.interceptor';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { ProjectsLayoutModule } from './modules/projects-layout/projects-layout.module';

import { AuthGuard, AuthenticationService, LocalStorageService } from './services/auth/index';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// App routes
const routes: Routes = [
  {
    path: '', loadChildren: './modules/projects-layout/projects-layout.module#ProjectsLayoutModule'
  },
  { path: 'auth', component: LoginComponent },
  // otherwise redirect to 404 page
  { path: '**', component: NotFoundComponent }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}
*/

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    LocalStorageService,
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

/*

 HttpClientModule,
    FormsModule,
    ProjectsLayoutModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    AuthGuard,
    AuthenticationService,
    LocalStorageService,
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: {}
    }
    */
