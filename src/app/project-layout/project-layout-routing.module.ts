import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectLayoutComponent } from './project-layout.component';

import { TestExecutionsModule } from '../test-executions/test-executions.module';

const routes: Routes = [
  {
    path: '', component: ProjectLayoutComponent, children: [
      { path: 'test-management', loadChildren: '../test-management/test-management.module#TestManagementModule' },
      { path: 'test-executions', loadChildren: '../test-executions/test-executions.module#TestExecutionsModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectLayoutRoutingModule { }
