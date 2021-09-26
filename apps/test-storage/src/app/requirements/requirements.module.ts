import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequirementsRoutingModule } from './requirements-routing.module';
import { RequirementsComponent } from './requirements.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RequirementsRoutingModule,
    SharedModule
  ],
  declarations: [RequirementsComponent]
})
export class RequirementsModule { }
