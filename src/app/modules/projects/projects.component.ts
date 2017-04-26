import { Component, OnInit } from '@angular/core';

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
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      data => this.projects = data,
      error => console.log(error)
    );
  }

}
