import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from './../../services/theme/theme.service';

import { HeaderModule } from './header/header.module';
import { HeaderComponent } from './header/header.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';




@NgModule({
  imports: [
    LayoutRoutingModule,
    CommonModule,
    TranslateModule,
    HeaderModule
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
