import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';

import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { MainSettingsComponent } from './main-settings/main-settings.component';
import { UsersService } from './users/users.service';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryService } from './inventory/inventory.service';
import { CreateUserModalComponent } from './users/create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from './users/edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from './users/delete-user-modal/delete-user-modal.component';
import { RolesService } from './roles/roles.service';
import { IntegrationsComponent } from './integrations/integrations.component';
import { CreateDeviceModalComponent } from './inventory/create-device-modal/create-device-modal.component';
import { EditDeviceModalComponent } from './inventory/edit-device-modal/edit-device-modal.component';
import { DeleteDeviceModalComponent } from './inventory/delete-device-modal/delete-device-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [
    SettingsComponent,
    UsersComponent,
    RolesComponent,
    IntegrationsComponent,
    MainSettingsComponent,
    InventoryComponent,
    CreateUserModalComponent,
    EditUserModalComponent,
    DeleteUserModalComponent,
    CreateDeviceModalComponent,
    EditDeviceModalComponent,
    DeleteDeviceModalComponent
  ],
  providers: [
    UsersService,
    RolesService,
    InventoryService
  ]
})
export class SettingsModule { }
