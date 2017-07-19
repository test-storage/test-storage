import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

import { ThemeService } from '../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-test-executions',
  templateUrl: './test-executions.component.html',
  styleUrls: ['./test-executions.component.css'],
  animations: [pageTransition()]
})
export class TestExecutionsComponent implements OnInit {

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
