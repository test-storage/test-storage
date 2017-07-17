import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../../animations';

import { Project } from '../../models/project';
import { ProjectService } from '../../services/project/project.service';
import { ThemeService } from '../../services/theme/theme.service';

import { NotificationsService } from 'angular2-notifications';


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
    private notificationsService: NotificationsService,
    public themeService: ThemeService,
    private projectService: ProjectService) { }

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
      error => this.notificationsService.error(error, '', {
        timeOut: 5000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
      })
    );
  }

}
