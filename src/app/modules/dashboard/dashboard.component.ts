import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

import { ThemeService } from '../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [pageTransition()]
})
export class DashboardComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  constructor(
    public themeService: ThemeService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

}
