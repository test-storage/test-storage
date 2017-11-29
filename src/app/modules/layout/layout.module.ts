import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from './../../services/theme/theme.service';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [
    LayoutRoutingModule,
    CommonModule,
    TranslateModule
  ],
  exports: [
    LayoutComponent
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    NotificationsComponent
  ],
  providers: [
    ThemeService
  ]
})
export class LayoutModule { }
