import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [pageTransition()]
})
export class SettingsComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  constructor(
    private notificationsService: NotificationsService,
    public themeService: ThemeService,
    public translate: TranslateService) { }


  ngOnInit() {
  }

}
