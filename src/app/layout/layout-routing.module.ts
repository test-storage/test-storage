import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsModule } from '../projects/projects.module';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // TODO AuthGuard
    children: [
      {
        path: '',
        redirectTo: '/projects',
        pathMatch: 'full'
      },
      {
        path: 'projects', loadChildren: '../projects/projects.module#ProjectsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
