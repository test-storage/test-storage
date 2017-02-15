import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'ts-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    public sidebarCollapsed = true;
    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {

     }

    onNotify(sidebarCollapsed: boolean): void {
        this.sidebarCollapsed = sidebarCollapsed;
    }
}