import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './authentication.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public error!: string | null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    protected translateService: TranslateService
  ) {
    this.user = new User();
    this.user.rememberMe = false;
  }

  ngOnInit(): void {
    this.authenticationService.isLoggedIn().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.router.navigateByUrl('');
      }
    });
  }

  login(): void {
    this.error = null;
    this.authenticationService.login(this.user).subscribe(
      response => this.authenticationService.setToken(response),
      error => {
        if (error.status === 401) {
          this.error = this.translateService.instant('LOGINPAGE.INVALID_CREDENTIALS');
        }
        if (error.status === 403) {
          this.error = this.translateService.instant('LOGINPAGE.USER_NOT_ACTIVATED');
        }
      }
    );
  }

}
