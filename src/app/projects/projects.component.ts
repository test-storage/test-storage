import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';

import { Project } from './project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [pageTransition]
})
export class ProjectsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';


  projects: Project[] = [];
  projectWizardOpened = false;

  constructor() { }

  ngOnInit() {
  }

  create() {
    this.projectWizardOpened = true;
    // TODO create project wizard
  }

}
