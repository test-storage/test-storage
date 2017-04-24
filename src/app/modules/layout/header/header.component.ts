import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard, AuthenticationService } from './../../../services/auth/index';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

    private sidebarCollapsed: boolean = true;
    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private router: Router,
        private authGuard: AuthGuard,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() { }

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