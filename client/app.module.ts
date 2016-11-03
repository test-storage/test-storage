import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { provideAuth } from 'angular2-jwt';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/auth/authentication.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderNavigationComponent } from './components/header-navigation.component';
import { TestcaseListComponent } from './components/testcase-list.component';
import { UserListComponent } from './components/user-list.component';


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
        HomeComponent,
        HeaderNavigationComponent,
        TestcaseListComponent,
        UserListComponent
    ],
    providers: [
        provideAuth({
             headerName: 'x-access-token',
             headerPrefix: '',
             tokenName: 'token',
             tokenGetter: (() => localStorage.getItem('currentUser')),
             globalHeaders: [],
             noJwtError: false,
             noTokenScheme: false
        }), 
        AuthGuard,
        AuthenticationService
        ],
    bootstrap: [AppComponent],
})
export class AppModule { }
