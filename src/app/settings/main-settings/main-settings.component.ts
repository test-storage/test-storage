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
  @HostBinding('style.position') position = 'absolute';

  constructor() { }

  ngOnInit() {
  }

}
