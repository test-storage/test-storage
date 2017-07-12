import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../../animations';

import { Project } from '../../models/project';
import { ProjectService } from '../../services/project/project.service';
import { ThemeService } from '../../services/theme/theme.service';

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
      error => console.log(error)
    );
  }

}
