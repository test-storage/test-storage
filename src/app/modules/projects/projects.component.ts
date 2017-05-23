import { Component, OnInit, OnDestroy } from '@angular/core';

import { Project } from '../../models/project';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [
    ProjectService
  ]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private subscription;
  public projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
    this.getData();
  }

  getData() {
    console.log(this.projects.length);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('unsubscribed');
  }

  getProjects() {
    this.subscription = this.projectService.getProjects().subscribe(
      data => this.projects = data, // Array.from(data) in case of non Project type response
      error => console.log(error)
    );
  }

}
