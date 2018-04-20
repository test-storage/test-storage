import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { UsersComponent } from './users/users.component';
import { MainSettingsComponent } from './main-settings/main-settings.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main', component: MainSettingsComponent
      },
      {
        path: 'users', component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
