import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSettingsComponent } from './project-settings.component';
import { ProjectSettingsRoutingModule } from './project-settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectSettingsRoutingModule
  ],
  declarations: [ProjectSettingsComponent]
})
export class ProjectSettingsModule { }
