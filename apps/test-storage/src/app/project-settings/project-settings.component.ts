import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css'],
  animations: [pageTransition]
})
export class ProjectSettingsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}
