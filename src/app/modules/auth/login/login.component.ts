import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme/theme.service';

import { AuthenticationService } from '../../../services/auth/index';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error: string;

    constructor(
        public themeService: ThemeService,
        private router: Router,
        private authenticationService: AuthenticationService,
        protected translateService: TranslateService
    ) {
        this.authenticationService.isLoggedIn().subscribe((loggedIn: boolean) => {
            if (loggedIn) {
                this.router.navigateByUrl('');
            }
        });
    }

    ngOnInit() {
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password);
    }
}
