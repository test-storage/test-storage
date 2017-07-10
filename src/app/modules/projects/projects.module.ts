import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
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
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes),
    CommonModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectDetailsComponent,
    CreateProjectComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
