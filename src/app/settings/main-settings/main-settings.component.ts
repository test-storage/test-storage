import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../../animations';

@Component({
  selector: 'app-main-settings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.css'],
  animations: [pageTransition]
})
export class MainSettingsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

}
