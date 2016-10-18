import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderNavigationComponent } from './components/header-navigation.component';
import { TestcaseListComponent } from './components/testcase-list.component';
import { UserListComponent } from './components/user-list.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        HeaderNavigationComponent,
        TestcaseListComponent,
        UserListComponent
    ],
    providers: [/* TODO: Providers go here */],
    bootstrap: [AppComponent],
})
export class AppModule { }
