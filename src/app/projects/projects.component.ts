import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';

import { Project } from './project';
import { ProjectsService } from './projects.service';
import { TranslateService } from '@ngx-translate/core';

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


  private subscription;
  projects: Project[];

  projectWizardOpened = false;

  constructor(
    private projectsService: ProjectsService,
    protected translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.subscription = this.projectsService.getProjects().subscribe(
      data => this.projects = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  create() {
    this.projectWizardOpened = true;
    setTimeout(this.refresh(), 13000);
    // TODO create project wizard
  }

  refresh() {
    // this.projectWizardOpened = false;
  }

}
