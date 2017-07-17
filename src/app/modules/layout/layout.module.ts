import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../services/auth/auth-guard.service';

import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from './../../services/theme/theme.service';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { NotificationsComponent } from './notifications/notifications.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { ClickOutModule } from 'ngx-clickout';

const layoutRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'settings',
        loadChildren: './../../modules/settings/settings.module#SettingsModule'
      },
      {
        path: 'profile',
        loadChildren: './../../modules/profile/profile.module#ProfileModule'
      },
      {
        path: 'dashboard',
        loadChildren: './../../modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'projects',
        loadChildren: './../../modules/projects/projects.module#ProjectsModule'
      },
      {
        path: 'testcases',
        loadChildren: './../../modules/testcases/testcases.module#TestcasesModule'
      },
      {
        path: 'executions',
        loadChildren: './../../modules/test-executions/test-executions.module#TestExecutionsModule'
      },
      {
        path: 'reports',
        loadChildren: './../../modules/reports/reports.module#ReportsModule'
      },
      {
        path: 'users',
        loadChildren: './../../modules/users/users.module#UsersModule'
      }
    ],
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(layoutRoutes),
    CommonModule,
    TranslateModule,
    ClickOutModule,
    SimpleNotificationsModule.forRoot()
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
    AuthGuard,
    ThemeService
  ]
})
export class LayoutModule { }
