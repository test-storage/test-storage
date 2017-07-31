import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { ThemeService } from './../../services/theme/theme.service';

import { SimpleNotificationsComponent } from 'angular2-notifications';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css']
})
export class LayoutComponent implements OnInit {
    public sidebarCollapsed = true;

    public toastNotificationsOptions = {
        timeOut: 5000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 30
    };

    constructor(
        public themeService: ThemeService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {

    }

    onNotify(sidebarCollapsed: boolean): void {
        this.sidebarCollapsed = sidebarCollapsed;
    }

}
