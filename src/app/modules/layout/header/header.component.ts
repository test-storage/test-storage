import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuard, AuthenticationService, LocalStorageService } from './../../../services/auth/index';

import { ThemeService } from './../../../services/theme/theme.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

    user: any = {};
    public sidebarCollapsed = true;
    public shown = '';
    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        public themeService: ThemeService,
        private router: Router,
        private authGuard: AuthGuard,
        private authenticationService: AuthenticationService,
        private storage: LocalStorageService
    ) { }

    ngOnInit() {
        this.loadUserData();
    }


    private loadUserData() {
        const data = this.storage.getUser();
        if (data) {
            this.user.firstName = data.firstName;
            this.user.lastName = data.lastName;
        } else {
            this.user.firstName = '';
            this.user.lastName = '';
        }
    }

    collapseToggle() {
        if (this.sidebarCollapsed) {
            this.sidebarCollapsed = false;
            this.notify.emit(false);
        } else {
            this.sidebarCollapsed = true;
            this.notify.emit(true);
        }
    }

    closeDropdown() {
        console.log('OK');
        this.shown = '';
    }

    logout() {
        this.authenticationService.logout();
        this.authGuard.canActivate();
    }
}
