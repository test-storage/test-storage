import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing'; //TODO: Create app.routing

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
    
        AppRoutingModule,
    ],
    declarations: [AppComponent],
    providers: [/* TODO: Providers go here */],
    bootstrap: [AppComponent],
})
export class AppModule { }
