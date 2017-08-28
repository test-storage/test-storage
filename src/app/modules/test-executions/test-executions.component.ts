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

  public testExecutions = [
    {
      name: 'Website regression testplan',
      description: 'Regression plan for website portal',
      status: 'In Progress',
      progress: 75,
      platform: ['web']
    },
    {
      name: 'Mobile Application registration feature testplan',
      description: 'Test registration scenario for iOS',
      status: 'Completed',
      progress: 100,
      platform: ['iOS', 'Android']
    }
  ];

  constructor(
    private notificationsService: NotificationsService,
    public themeService: ThemeService
  ) { }

  ngOnInit() {
  }

}
