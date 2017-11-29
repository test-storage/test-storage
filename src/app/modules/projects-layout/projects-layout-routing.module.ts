import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsLayoutComponent } from './projects-layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/projects',
        pathMatch: 'full'
      },
      {
        path: 'settings',
        loadChildren: './../../modules/settings/settings.module#SettingsModule'
      },
      {
        path: 'profile',
        loadChildren: './../../modules/profile/profile.module#ProfileModule'
      },
      {
        path: 'dashboard',
        loadChildren: './../../modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'projects',
        loadChildren: './../../modules/projects/projects.module#ProjectsModule'
      }
    ],
    component: ProjectsLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsLayoutRoutingModule { }
