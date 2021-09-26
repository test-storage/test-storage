import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { User } from '../../settings/users/user';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public user: User = new User();
  public success = false;
  public error: string | null = null;

  constructor(
    private router: Router,
    private signUpService: SignUpService,
    protected translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    this.error = null;
    /*
    this.signUpService.registerNewUser(this.user).subscribe(
      response => this.success = true,
      error => {
        if (error.status === 401) {
          this.error = this.translateService.instant('LOGINPAGE.INVALID_CREDENTIALS');
        }
        if (error.status === 403) {
          this.error = this.translateService.instant('LOGINPAGE.USER_NOT_ACTIVATED');
        }
      }
    );
    */
  }

}
