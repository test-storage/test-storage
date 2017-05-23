import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project = {
    name: 'Dummy Project 10',
    description: 'Dummy Project Description',
    enabled: true,
    testcases: [],
    createdBy: 'Admin',
    updatedBy: 'Admin'
  };

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.createNewProject();
  }

  createNewProject() {
    this.projectService.createProject(this.project).subscribe(
      data => console.log('data: ' + JSON.stringify(data)), // this.project = data,
      error => console.log(error)
    );
  }

}
