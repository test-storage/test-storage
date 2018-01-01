import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from './../../../services/theme/theme.service';

import { TranslateModule } from '@ngx-translate/core';
import { ClickOutModule } from 'ngx-clickout';

import { HeaderComponent } from './header.component';
import { NotificationsComponent } from '../notifications/notifications.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ClickOutModule
  ],
  declarations: [
    HeaderComponent,
    NotificationsComponent
  ],
  providers: [
    ThemeService
  ],
  exports: [
    HeaderComponent,
    NotificationsComponent
  ]
})
export class HeaderModule { }
