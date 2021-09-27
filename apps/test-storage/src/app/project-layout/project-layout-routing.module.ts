import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectLayoutComponent } from './project-layout.component';

const routes: Routes = [
  {
    path: '', component: ProjectLayoutComponent,
    children: [
      { path: '', redirectTo: 'test-management', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'requirements', loadChildren: () => import('../requirements/requirements.module').then(m => m.RequirementsModule) },
      { path: 'test-management', loadChildren: () => import('../test-management/test-management.module').
        then(m => m.TestManagementModule) },
      { path: 'test-executions', loadChildren: () => import('../test-executions/test-executions.module').
        then(m => m.TestExecutionsModule) },
      { path: 'reports', loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule) },
      { path: 'settings', loadChildren: () => import('../project-settings/project-settings.module').
        then(m => m.ProjectSettingsModule), pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectLayoutRoutingModule { }
