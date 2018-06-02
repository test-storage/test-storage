import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { pageTransition } from '../animations';

import { Project } from './project';
import { ProjectsService } from './projects.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

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
    private notificationsService: NotificationsService
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
          this.notificationsService.success(
            `${project.name}`,
            this.translateService.instant('COMMON.SUCCESSFULLY_CREATED')
          );
          this.projects.push(response.body);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 403) {
          this.notificationsService.warn(
            this.translateService.instant('COMMON.FORBIDDEN'),
            this.translateService.instant('COMMON.PERMISSIONS')
          );
        } else {
          this.notificationsService.error(
            this.translateService.instant('COMMON.ERROR_OCCURED'),
            this.translateService.instant('COMMON.ERROR_ACTION')
          );
        }
      }
    );
  }

  updateProject(project: Project) {

    this.projectsService.updateProject(project, project._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.success(
            project.name,
            this.translateService.instant('COMMON.SUCCESSFULLY_UPDATED')
          );

          const foundIndex = this.projects.findIndex(mProject => mProject._id === project._id);
          this.projects[foundIndex] = project;

        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 403) {
          this.notificationsService.warn(
            this.translateService.instant('COMMON.FORBIDDEN'),
            this.translateService.instant('COMMON.PERMISSIONS')
          );
        } else {
          this.notificationsService.error(
            this.translateService.instant('COMMON.ERROR_OCCURED'),
            this.translateService.instant('COMMON.ERROR_ACTION')
          );
        }
      }
    );
  }

  forceDelete($event) {

    this.projectsService.deleteProject(this.selectedProject._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.success(
            this.selectedProject.name,
            this.translateService.instant('COMMON.SUCCESSFULLY_DELETED')
          );
          this.projects = this.projects.filter(projects => projects !== this.selectedProject);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 403) {
          this.notificationsService.warn(
            this.translateService.instant('COMMON.FORBIDDEN'),
            this.translateService.instant('COMMON.PERMISSIONS')
          );
        } else {
          this.notificationsService.error(
            this.translateService.instant('COMMON.ERROR_OCCURED'),
            this.translateService.instant('COMMON.ERROR_ACTION')
          );
        }
      }
    );
  }

}
