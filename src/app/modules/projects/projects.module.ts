import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { ProjectService } from '../../services/project/project.service';
import { CreateProjectComponent } from './create-project/create-project.component';

const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'create',
    component: CreateProjectComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: ProjectDetailsComponent
  },
  {
    path: ':id/settings',
    component: ProjectSettingsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes),
    CommonModule,
    FormsModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectDetailsComponent,
    ProjectSettingsComponent,
    CreateProjectComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
