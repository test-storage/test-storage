import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './../guards/auth.guard';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'ts-header-nav',
    templateUrl: 'header-navigation.component.html',
    styleUrls: ['header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {
    constructor(
        private router: Router,
        private authGuard: AuthGuard,
        private authenticationService: AuthenticationService) { }

    ngOnInit() { }

    logout() {
        this.authenticationService.logout();
        this.authGuard.canActivate();
    }
}