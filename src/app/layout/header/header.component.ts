import { AuthGuard } from './../../login/auth.guard';
import { AuthenticationService } from './../../login/authentication.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authGuard: AuthGuard,
    private authService: AuthenticationService,
    protected translateService: TranslateService
  ) { }

  ngOnInit() {
  }


  logout() {
    this.authService.logout();
    this.authGuard.canActivate();
  }

}
