import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

import { ThemeService } from '../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [pageTransition()]
})
export class ReportsComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  constructor(
    private notificationsService: NotificationsService,
    public themeService: ThemeService
  ) { }

  ngOnInit() {
  }

}
