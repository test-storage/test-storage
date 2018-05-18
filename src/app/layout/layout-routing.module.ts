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
        path: 'projects', loadChildren: '../projects/projects.module#ProjectsModule'
      },
      {
        path: 'profile', loadChildren: '../user-profile/user-profile.module#UserProfileModule'
      },
      {
        path: 'settings', loadChildren: '../settings/settings.module#SettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
