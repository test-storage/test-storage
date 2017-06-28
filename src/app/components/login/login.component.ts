import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from '../../services/auth/authentication.service';

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
        private router: Router,
        private authenticationService: AuthenticationService,
        protected translateService: TranslateService
    ) { }

    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                }
            },
            error => {
                this.translateService.get(error).subscribe((err: string) => {
                    this.error = err;
                });
                this.loading = false;
            }
            );
    }
}
