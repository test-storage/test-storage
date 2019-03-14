import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSettingsComponent } from './project-settings.component';
import { ProjectSettingsRoutingModule } from './project-settings-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectSettingsRoutingModule,
    SharedModule
  ],
  declarations: [ProjectSettingsComponent]
})
export class ProjectSettingsModule { }
