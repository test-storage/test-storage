import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent
  },
  {
    path: ':id', loadChildren: () => import('../project-layout/project-layout.module').
      then(m => m.ProjectLayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
