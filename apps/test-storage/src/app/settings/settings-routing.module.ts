import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { UsersComponent } from './users/users.component';
import { MainSettingsComponent } from './main-settings/main-settings.component';
import { InventoryComponent } from './inventory/inventory.component';
import { IntegrationsComponent } from './integrations/integrations.component';

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
        path: 'main', component: MainSettingsComponent, pathMatch: 'full'
      },
      {
        path: 'users', component: UsersComponent, pathMatch: 'full'
      },
      {
        path: 'inventory', component: InventoryComponent, pathMatch: 'full'
      },
      {
        path: 'integrations', component: IntegrationsComponent, pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
