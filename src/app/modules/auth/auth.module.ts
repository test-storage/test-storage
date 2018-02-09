import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { AuthRoutingModule } from './auth-routing.module';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AuthInterceptor } from '../../services/auth/auth.interceptor';
import { AuthGuard, AuthenticationService, LocalStorageService } from '../../services/auth/index';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ThemeService } from '../../services/theme/theme.service';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    TranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    AuthenticationService,
    LocalStorageService,
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: {}
    },
    ThemeService
  ],
  declarations: [
    LoginComponent,
    NotFoundComponent,
    AuthComponent
  ]
})
export class AuthModule { }
