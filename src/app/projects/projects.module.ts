import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from '../shared/shared.module';

import { ProjectWizardComponent } from './project-wizard/project-wizard.component';
import { SystemWizardComponent } from '../system-wizard/system-wizard.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectWizardComponent,
    SystemWizardComponent
  ]
})
export class ProjectsModule { }
