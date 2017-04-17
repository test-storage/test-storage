import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../guards/auth.guard';

import { ProjectsComponent } from './projects.component';

const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes),
    CommonModule
  ],
  declarations: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
