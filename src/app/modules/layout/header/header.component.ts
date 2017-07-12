import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard, AuthenticationService } from './../../../services/auth/index';
import { ThemeService } from './../../../services/theme/theme.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

    user: any = {};
    private sidebarCollapsed = true;
    public shown = '';
    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        public themeService: ThemeService,
        private router: Router,
        private authGuard: AuthGuard,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.loadUserData();
    }


    private loadUserData() {
        const data = JSON.parse(localStorage.getItem('currentUser'));
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
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

    logout() {
        this.authenticationService.logout();
        this.authGuard.canActivate();
    }
}
