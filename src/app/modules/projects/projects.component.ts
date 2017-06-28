import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../../animations';
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
  public projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }

  ngOnDestroy() {
    // TODO unsubscription from http services needed?
    this.subscription.unsubscribe();
  }

  getProjects() {
    this.subscription = this.projectService.getProjects().subscribe(
      data => this.projects = data, // Array.from(data) in case of non Project type response
      error => console.log(error)
    );
  }

}
