import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectLayoutRoutingModule } from './project-layout-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectLayoutComponent } from './project-layout.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  imports: [
    CommonModule,
    ProjectLayoutRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [
    SidebarComponent,
    ProjectLayoutComponent
  ]
})
export class ProjectLayoutModule { }
