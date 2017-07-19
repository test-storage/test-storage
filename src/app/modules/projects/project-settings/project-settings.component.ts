import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../../animations';

import { ThemeService } from '../../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css'],
  animations: [pageTransition()]
})
export class ProjectSettingsComponent implements OnInit {

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
