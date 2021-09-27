import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/projects',
        pathMatch: 'full'
      },
      {
        path: 'projects', loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'profile', loadChildren: () => import('../user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'settings', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
