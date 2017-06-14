import { Component, OnInit, HostBinding } from '@angular/core';
import Animations from '../../animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [Animations.pageTransition]
})
export class SettingsComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  constructor(protected translate: TranslateService) { }

  ngOnInit() {
  }

}
