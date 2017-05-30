import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  id: string;
  private subscription;

  /* project: Project = {
    name: 'Dummy Project 10',
    description: 'Dummy Project Description',
    enabled: true,
    testcases: [],
    createdBy: 'Admin',
    updatedBy: 'Admin'
  }; */

  project: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.getProject(this.id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProject(id: string) {
    /* this.subscription = */
    this.projectService.getProject(id).subscribe(
      data => this.project = data,
      error => console.log(error)
    );
  }

  createNewProject() {
    this.projectService.createProject(this.project).subscribe(
      data => console.log('data: ' + JSON.stringify(data)), // this.project = data,
      error => console.log(error)
    );
  }

}
