import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ThemeService } from './../../services/theme/theme.service';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderModule } from '../layout/header/header.module';

import { ProjectsLayoutRoutingModule } from './projects-layout-routing.module';
import { ProjectsLayoutComponent } from './projects-layout.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsLayoutRoutingModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    TranslateModule,
    HeaderModule,
    SharedModule
  ],
  declarations: [
    ProjectsLayoutComponent
  ]
})
export class ProjectsLayoutModule { }
