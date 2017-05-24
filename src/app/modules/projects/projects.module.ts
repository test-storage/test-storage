import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';

const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes),
    CommonModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectComponent
  ]
})
export class ProjectsModule { }
