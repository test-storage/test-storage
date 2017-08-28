import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../../animations';

import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

import { ThemeService } from '../../services/theme/theme.service';

import { Project } from '../../models/project';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [
    ProjectService
  ],
  animations: [pageTransition()]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  private subscription;
  public projects: Project[];

  constructor(
    private projectService: ProjectService,
    private notificationsService: NotificationsService,
    public themeService: ThemeService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  ngOnDestroy() {
    // TODO unsubscription from http services needed?
    this.subscription.unsubscribe();
  }

  getProjects() {
    this.subscription = this.projectService.getProjects().subscribe(
      data => this.projects = data,
      error => this.notificationsService.error(error, ''));
  }

}
