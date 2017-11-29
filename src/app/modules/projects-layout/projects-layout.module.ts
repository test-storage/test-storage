import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ThemeService } from './../../services/theme/theme.service';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from '../layout/header/header.component';
import { NotificationsComponent } from '../layout/notifications/notifications.component';

import { ProjectsLayoutRoutingModule } from './projects-layout-routing.module';
import { ProjectsLayoutComponent } from './projects-layout.component';

import { ClickOutModule } from 'ngx-clickout';
import { NotificationComponent } from 'angular2-notifications';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsLayoutRoutingModule,
    FormsModule,
    ClickOutModule,
    SimpleNotificationsModule.forRoot(),
    TranslateModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    NotificationsComponent,
    ProjectsLayoutComponent
  ]
})
export class ProjectsLayoutModule { }
