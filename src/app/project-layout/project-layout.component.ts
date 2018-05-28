import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pageTransition } from '../animations';

import { ProjectsService } from './../projects/projects.service';
import { Project } from '../projects/project';

@Component({
  selector: 'app-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.css'],
  animations: [pageTransition]
})
export class ProjectLayoutComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  collapsed = false;

  id: string;
  private subscription;
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadProject(this.id);
    });
  }


  loadProject(id: string) {
    this.subscription = this.projectsService.getProject(id).subscribe(
      data => this.project = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

}
