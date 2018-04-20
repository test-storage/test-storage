import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectLayoutComponent } from './project-layout.component';

const routes: Routes = [
  {
    path: '', component: ProjectLayoutComponent,
    children: [
      { path: '', redirectTo: 'test-management', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
      { path: 'requirements', loadChildren: '../requirements/requirements.module#RequirementsModule' },
      { path: 'test-management', loadChildren: '../test-management/test-management.module#TestManagementModule' },
      { path: 'test-executions', loadChildren: '../test-executions/test-executions.module#TestExecutionsModule' },
      { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule' },
      { path: 'settings', loadChildren: '../project-settings/project-settings.module#ProjectSettingsModule', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectLayoutRoutingModule { }
