import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../guards/auth.guard';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DashboardModule } from './../dashboard/dashboard.module';
import { ProjectsModule } from './../projects/projects.module';

const layoutRoutes: Routes = [
  {
    path: '', children: [
      {
        path: 'dashboard',
        loadChildren: './../../modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'projects',
        loadChildren: './../../modules/projects/projects.module#ProjectsModule'
      }
    ],
    component: LayoutComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(layoutRoutes),
    CommonModule
  ],
  exports: [
    LayoutComponent
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }
