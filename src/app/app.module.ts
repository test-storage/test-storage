import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/auth/authentication.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderNavigationComponent } from './components/header-navigation/header-navigation.component';

import { LoginComponent } from './components/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestcaseListComponent } from './components/testcase-list/testcase-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProjectsComponent } from './components/projects/projects.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-access-token',
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('currentUser')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderNavigationComponent,
    TestcaseListComponent,
    UserListComponent,
    ProjectsComponent
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
