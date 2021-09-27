import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
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

  private subscription!: Subscription;
  projects!: Project[];
  selectedProject!: Project;

  projectWizardOpened = false;

  public createOpened = false;
  public editOpened = false;
  public deleteOpened = false;

  constructor(
    private projectsService: ProjectsService,
    protected translateService: TranslateService,
    private notificationsService: ToastNotificationsService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProjects(): void {
    this.subscription = this.projectsService.getProjects().subscribe(
      data => this.projects = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onDragStart(event: any): void {
    console.log(event);
    // event.dataTransfer.setDataTransfer('update', event.target.id);
  }

  onDrop(event: any, target: any): void {
    const prevIndex = this.projects.findIndex((item) => item._id === event.dragDataTransfer._id);
    const targetIndex = this.projects.findIndex((item) => item._id === target._id);
    const temp = this.projects[prevIndex];
    this.projects[prevIndex] = this.projects[targetIndex];
    this.projects[targetIndex] = temp;
  }

  onAdd(): void {
    this.createOpened = true;
  }

  onEdit(project: Project): void {
    this.selectedProject = project;
    this.editOpened = true;
  }

  onDelete(project: Project): void {
    this.selectedProject = project;
    this.deleteOpened = true;
  }

  getBackgroundColor(project: Project): string {
    return `hsl(${project.avatarColor}, 53%, 90%)`;
  }

  getColor(project: Project): string {
    return `hsl(${project.avatarColor}, 50%, 50%)`;
  }

  createProject(project: Project): void {

    this.projectsService.createProject(project).subscribe(
      (response: HttpResponse<Project>) => {
        if (response.status === 201) {
          this.notificationsService.successfullyCreated(project.name);
          this.projects.push(response.body as Project);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  updateProject(project: Project): void {

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
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      });
  }

  forceDelete($event: any): void {

    this.projectsService.deleteProject(this.selectedProject._id as string).subscribe(
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
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

}
