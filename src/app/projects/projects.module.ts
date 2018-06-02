import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from '../shared/shared.module';

import { ProjectWizardComponent } from './project-wizard/project-wizard.component';
import { SystemWizardComponent } from '../system-wizard/system-wizard.component';
import { ProjectsService } from './projects.service';

import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';
import { EditProjectModalComponent } from './edit-project-modal/edit-project-modal.component';
import { DeleteProjectModalComponent } from './delete-project-modal/delete-project-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectWizardComponent,
    SystemWizardComponent,
    CreateProjectModalComponent,
    EditProjectModalComponent,
    DeleteProjectModalComponent
  ],
  providers: [
    ProjectsService
  ]
})
export class ProjectsModule { }
