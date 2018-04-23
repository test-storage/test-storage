import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequirementsRoutingModule } from './requirements-routing.module';
import { RequirementsComponent } from './requirements.component';

@NgModule({
  imports: [
    CommonModule,
    RequirementsRoutingModule
  ],
  declarations: [RequirementsComponent]
})
export class RequirementsModule { }
