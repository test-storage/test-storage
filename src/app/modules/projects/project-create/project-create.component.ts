import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { pageTransition } from '../../../animations';
import { ThemeService } from '../../../services/theme/theme.service';

import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
  providers: [
    ThemeService,
    ProjectService
  ],
  animations: [pageTransition()]
})

export class ProjectCreateComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  public project: Project = new Project();

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private projectService: ProjectService) { }

  ngOnInit() {
  }

  createNewProject() {
    this.projectService.createProject(this.project).subscribe(
      response => {
        if (response === 201) {
          this.router.navigate(['./projects']);
        }
      },
      error => console.log(error)
    );
  }
}
