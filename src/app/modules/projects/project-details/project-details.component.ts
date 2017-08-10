import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

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
  project: Project;
  public loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastNotificationsService: NotificationsService,
    public themeService: ThemeService,
    public translate: TranslateService
  ) { }

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

  deleteProject(id: string) {
    this.loading = true;
    this.projectService.deleteProject(id).subscribe(
      response => {
        if (response === 204) {
          this.toastNotificationsService.success('Project ' + this.project.name, 'deleted successfully!');

          this.router.navigate(['./projects']);
        }
      },
      error => console.log(error)
    );
  }

}
