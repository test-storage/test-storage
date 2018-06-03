import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { pageTransition } from '../animations';

import { Project } from './project';
import { ProjectsService } from './projects.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from '../shared/toast-notifications.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [pageTransition]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  private subscription;
  projects: Project[];
  selectedProject: Project;

  projectWizardOpened = false;

  public createOpened = false;
  public editOpened = false;
  public deleteOpened = false;

  constructor(
    private projectsService: ProjectsService,
    protected translateService: TranslateService,
    private notificationsService: ToastNotificationsService
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadProjects() {
    this.subscription = this.projectsService.getProjects().subscribe(
      data => this.projects = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onAdd() {
    this.createOpened = true;
  }

  onEdit() {
    this.editOpened = true;
  }

  onDelete() {
    this.deleteOpened = true;
  }

  getBackgroundColor(project: Project): string {
    return `hsl(${project.avatarColor}, 53%, 90%)`;
  }

  getColor(project: Project): string {
    return `hsl(${project.avatarColor}, 50%, 50%)`;
  }

  createProject(project: Project) {

    this.projectsService.createProject(project).subscribe(
      (response: HttpResponse<Project>) => {
        if (response.status === 201) {
          this.notificationsService.successfullyCreated(project.name);
          this.projects.push(response.body);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        }
        if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  updateProject(project: Project) {

    this.projectsService.updateProject(project, project._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.successfullyUpdated(project.name);

          const foundIndex = this.projects.findIndex(mProject => mProject._id === project._id);
          this.projects[foundIndex] = project;

        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        }
        if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      });
  }

  forceDelete($event) {

    this.projectsService.deleteProject(this.selectedProject._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.successfullyDeleted(this.selectedProject.name);
          this.projects = this.projects.filter(projects => projects !== this.selectedProject);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        }
        if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

}
