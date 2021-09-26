import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthInterceptor } from './login/auth.interceptor';
import { AuthGuard } from './login/auth.guard';
import { AuthenticationService } from './login/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageService } from './login/local-storage.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  providers: [
    AuthenticationService,
    AuthGuard,
    LocalStorageService,
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: {}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
