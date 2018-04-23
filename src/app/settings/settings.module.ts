import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';

import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { MainSettingsComponent } from './main-settings/main-settings.component';
import { UsersService } from './users/users.service';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryService } from './inventory/inventory.service';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ],
  declarations: [
    SettingsComponent,
    UsersComponent,
    RolesComponent,
    MainSettingsComponent,
    InventoryComponent
  ],
  providers: [
    UsersService,
    InventoryService
  ]
})
export class SettingsModule { }
