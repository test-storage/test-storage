import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './../../services/auth/auth-guard.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from './../../services/theme/theme.service';

import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { ProjectService } from '../../services/project/project.service';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { AuthenticationService } from '../../services/auth/index';

const projectsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProjectsComponent
      },
      {
        path: 'create',
        component: ProjectCreateComponent,
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
      }],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes),
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectDetailsComponent,
    ProjectSettingsComponent,
    ProjectCreateComponent
  ],
  providers: [
    AuthGuard,
    ProjectService,
    ThemeService
  ]
})
export class ProjectsModule { }
