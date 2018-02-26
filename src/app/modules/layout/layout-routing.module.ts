import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
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
      },
      {
        path: 'testcases',
        loadChildren: './../../modules/testcases/testcases.module#TestcasesModule'
      },
      {
        path: 'executions',
        loadChildren: './../../modules/test-executions/test-executions.module#TestExecutionsModule'
      },
      {
        path: 'reports',
        loadChildren: './../../modules/reports/reports.module#ReportsModule'
      },
      {
        path: 'users',
        loadChildren: './../../modules/users/users.module#UsersModule'
      }
    ],
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
